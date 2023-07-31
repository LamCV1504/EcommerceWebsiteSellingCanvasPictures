package com.webtranh.controller.auth;

import com.webtranh.controller.auth.models.FormLogin;
import com.webtranh.controller.auth.models.TokenResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/v1/auth")
@Tag(name = "auth", description = "Authentication API")
public interface AuthAPI {

    @PostMapping("/login")
    TokenResponse login(@Valid @RequestBody FormLogin formLogin);
}
