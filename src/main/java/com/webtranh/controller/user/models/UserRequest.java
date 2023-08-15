package com.webtranh.controller.user.models;

import com.webtranh.model.enums.ESex;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UserRequest(
        @NotNull String firstName,
        @NotNull String lastName,
        LocalDate dob,
        @Enumerated(EnumType.STRING)
        ESex sex,
        @NotNull String address,
        @Email String email,
        @NotBlank String phone,
        String image,
        @NotBlank String password
) {}


