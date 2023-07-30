package com.webtranh.util;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.webtranh.model.TokenValue;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtUtil {

    private static final String SECRET = "4125442A472D4B6150645367556B58703273357638792F423F4528482B4D62514125442A472D4B6150645367556B58703273357638792F423F4528482B4D6251";
    private static final Key SIGNKEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));
    private static final Integer EXPIRE_ACCESS_TOKEN = 60_000*10; // 10 minute (600s)
    private static final Integer EXPIRE_REFRESH_TOKEN = 60_000*60*24*7; // 7 day

    public String getJwtFromHeader(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        if(Objects.nonNull(jwt) && jwt.startsWith("Bearer ")) {
            return jwt.substring(7);
        }
        return null;
    }

    public TokenValue getValueAccessToken(String jwt) {
        Object obj = validateJwtToken(jwt);
        if(Objects.isNull(obj)) return null;
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(obj, new TypeReference<Map<String, Object>>() {});
        List<String> list = objectMapper.convertValue(map.get("permissions"), new TypeReference<List<String>>() {});
        return TokenValue.builder()
                        .userId(Integer.valueOf(map.get("userId").toString()))
                        .permissions(list)
                        .iat(Long.valueOf(map.get("iat").toString()))
                        .exp(Long.valueOf(map.get("exp").toString()))
                        .build();
    }

    public String getValueForgotToken(String jwt) {
        Object obj = validateJwtToken(jwt);
        if(Objects.isNull(obj)) return null;
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(obj, new TypeReference<Map<String, Object>>() {});
        return map.get("sub").toString();
    }

    public Integer getValueRefreshToken(String jwt) {
        Object obj = validateJwtToken(jwt);
        if(Objects.isNull(obj)) return null;
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(obj, new TypeReference<Map<String, Object>>() {});
        return Integer.valueOf(map.get("sub").toString());
    }

    public Object validateJwtToken(String jwt) {
        try {
            return Jwts.parserBuilder()
                        .setSigningKey(SIGNKEY)
                        .build()
                        .parse(jwt)
                        .getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public String generateAccessToken(Integer userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId.toString());
//        claims.put("permissions", permissionService.permissionUserId(userId));

        return Jwts.builder()
                    .setId(userId.toString())
                    .setClaims(claims)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + EXPIRE_ACCESS_TOKEN))
                    .signWith(SIGNKEY, SignatureAlgorithm.HS512)
                    .compact();
    }

    public String generateForgotPasswordToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + EXPIRE_ACCESS_TOKEN/2)) //5 minutes
                .signWith(SIGNKEY, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(Integer userId) {
        return Jwts.builder()
                    .setSubject(userId.toString())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + EXPIRE_REFRESH_TOKEN))
                    .signWith(SIGNKEY, SignatureAlgorithm.HS512)
                    .compact();
    }
}
