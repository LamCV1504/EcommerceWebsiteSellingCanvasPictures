package com.webtranh.controller.user.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.webtranh.model.enums.ESex;

import java.time.LocalDate;

public record UserUpdate(
        String firstName,
        String lastName,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate dob,
        ESex sex,
        String address,
        String email,
        String phone,
        String image
) {}
