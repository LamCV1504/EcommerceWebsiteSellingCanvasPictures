package com.webtranh.controller.user;

import com.webtranh.controller.user.models.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/users")
@Tag(name = "user", description = "User API")
public interface UserAPI {

    @GetMapping("/{userId}")
    UserResponse getUserById(@PathVariable Integer userId);

    @GetMapping
    Page<UserResponse> getUserPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void register(@RequestBody @Valid UserRequest user);

    @PatchMapping("/{userId}")
    void changeInfo(@PathVariable Integer userId, @RequestBody @Valid UserUpdate user);

    @DeleteMapping("/{userId}")
    void deleteUser(@PathVariable Integer userId);

    @PatchMapping("/{userId}/change-password")
    void changePassword(@PathVariable Integer userId, @RequestBody @Valid ChangePassword form);

    @PostMapping("/forgot-password/{email}")
    void getCodeForgotPassword(@PathVariable String email);

    @PatchMapping("/forgot-password")
    void forgotPassword(@RequestBody @Valid ForgotPassword form);
}
