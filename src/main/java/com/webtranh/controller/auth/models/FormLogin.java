package com.webtranh.controller.auth.models;

import jakarta.validation.constraints.NotBlank;

public record FormLogin(
        @NotBlank String email,
        @NotBlank String password
) {}
