package com.webtranh.controller.user;

import com.webtranh.controller.user.models.UserRequest;
import com.webtranh.controller.user.models.UserResponse;
import com.webtranh.controller.user.models.UserUpdate;
import com.webtranh.service.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController implements UserAPI {

    @NonNull final UserService userService;

    @Override
    public UserResponse getUserById(Integer userId) {
        return userService.getUserById(userId);
    }

    @Override
    public Page<UserResponse> getUserPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return userService.getUserPaging(pageRequest);
    }

    @Override
    public void register(UserRequest user) {
        userService.register(user);
    }

    @Override
    public void changeInfo(Integer userId, UserUpdate user) {
        userService.changeInfo(userId, user);
    }

    @Override
    public void deleteUser(Integer userId) {
        userService.deleteUser(userId);
    }
}
