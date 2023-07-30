package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.user.models.UserRequest;
import com.webtranh.controller.user.models.UserResponse;
import com.webtranh.controller.user.models.UserUpdate;
import com.webtranh.dto.UserMapper;
import com.webtranh.repository.user.UserEntity;
import com.webtranh.repository.user.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @NonNull final UserRepository userRepository;
    @NonNull final UserMapper userMapper;
    @NonNull final PasswordEncoder passwordEncoder;

    public void register(UserRequest user) {
        UserEntity newUser = userMapper.toEntity(user);
        newUser.setPassword(passwordEncoder.encode(user.password()));
        userRepository.save(userMapper.toEntity(user));
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
}
