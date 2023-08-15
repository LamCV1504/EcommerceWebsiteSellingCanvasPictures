package com.webtranh.controller.user.models;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

public record ChangePassword(
        @NotNull Integer userId,
        @NotNull String oldPassword,
        @NotNull String newPassword,
        @NotNull String confirmPassword
) {
    @AssertTrue(message = "Hai mật khẩu không khớp !!")
    public boolean isMatches() {
        if(Objects.nonNull(newPassword) && Objects.nonNull(confirmPassword)) {
            return (newPassword.equals(confirmPassword));
        }
        return false;
    }
}
