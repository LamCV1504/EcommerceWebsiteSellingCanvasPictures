package com.webtranh.controller.user.models;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

public record ForgotPassword(
        @NotNull @Email String email,
        @NotNull String newPassword,
        @NotNull String confirmPassword,
        @NotNull String code
) {
    @AssertTrue(message = "Hai mật khẩu không khớp !!")
    public boolean isMatches() {
        if(Objects.nonNull(newPassword) && Objects.nonNull(confirmPassword)) {
            return (newPassword.equals(confirmPassword));
        }
        return false;
    }
}
