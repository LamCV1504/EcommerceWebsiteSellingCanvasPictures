package com.webtranh.service;

import com.webtranh.config.exception.RequestInvalidException;
import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.auth.models.FormLogin;
import com.webtranh.controller.auth.models.TokenResponse;
import com.webtranh.controller.user.models.*;
import com.webtranh.dto.UserMapper;
import com.webtranh.repository.category.CategoryEntity;
import com.webtranh.repository.user.UserEntity;
import com.webtranh.repository.user.UserRepository;
import com.webtranh.util.EmailUtil;
import com.webtranh.util.GenerateCode;
import com.webtranh.util.JwtUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @NonNull final UserRepository userRepository;
    @NonNull final UserMapper userMapper;
    @NonNull final PasswordEncoder passwordEncoder;
    @NonNull final JwtUtil jwtUtil;
    @NonNull final EmailUtil emailUtil;

    public void register(UserRequest user) {
        Optional<UserEntity> foundUser = userRepository.findByEmail(user.email());
        if (foundUser.isPresent()) {
            throw new ResourceNotFoundException("Địa chỉ email đã tồn tại");
        }
        UserEntity newUser = userMapper.toEntity(user);
        newUser.setPassword(passwordEncoder.encode(user.password()));
        userRepository.save(newUser);
    }

    public UserResponse getUserById(Integer userId) {
        return userMapper.toDto(userRepository.findById(userId)
                        .orElseThrow(ResourceNotFoundException::new));
    }

    public void changeInfo(Integer userId, UserUpdate user) {
        UserEntity foundUser = userRepository.findById(userId).orElseThrow(ResourceNotFoundException::new);
        userMapper.updateExisted(user, foundUser);
        userRepository.save(foundUser);
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

    public Page<UserResponse> getUserPaging(PageRequest pageRequest) {
        Page<UserEntity> foundUser = userRepository.findAll(pageRequest);
        return new PageImpl<>(userMapper.toDto(foundUser.getContent()),
                              pageRequest,
                              foundUser.getTotalElements());
    }

    public TokenResponse login(FormLogin formLogin) {
        UserEntity foundUser = userRepository.findByEmail(formLogin.email())
                .orElseThrow(() -> new ResourceNotFoundException("Email chưa đăng ký"));
        if(!passwordEncoder.matches(formLogin.password(), foundUser.getPassword()))
            throw new ResourceNotFoundException("Mật khẩu sai");
        return TokenResponse.builder()
                            .accessToken(jwtUtil.generateAccessToken(foundUser.getUserId()))
                            .refreshToken(jwtUtil.generateRefreshToken(foundUser.getUserId()))
                            .userId(foundUser.getUserId())
                            .build();
    }

    public void changePassword(Integer userId, ChangePassword form) {
        UserEntity foundUser = userRepository.findById(userId).orElseThrow(ResourceNotFoundException::new);
        if(!passwordEncoder.matches(form.oldPassword(), foundUser.getPassword()))
            throw new RequestInvalidException("Mật khẩu cũ sai !!");
        foundUser.setPassword(passwordEncoder.encode(form.newPassword()));
        userRepository.save(foundUser);
    }

    public void getCodeForgotPassword(String email) {
        UserEntity foundUser = userRepository.findByEmail(email).orElseThrow(ResourceNotFoundException::new);
        foundUser.setCode(GenerateCode.getAlphaNumericString(6));

        emailUtil.forgotPassword(foundUser);
        userRepository.save(foundUser);
    }

    public void forgotPassword(ForgotPassword form) {
        UserEntity foundUser = userRepository.findByEmail(form.email()).orElseThrow(ResourceNotFoundException::new);
        if(!foundUser.getCode().equals(form.code())) throw new RequestInvalidException("Mã không tồn tại !!");
        foundUser.setPassword(passwordEncoder.encode(form.newPassword()));
        userRepository.save(foundUser);
    }
}
