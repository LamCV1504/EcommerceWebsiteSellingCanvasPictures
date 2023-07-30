package com.webtranh.controller.group_user.models;

import jakarta.validation.constraints.NotNull;

public record GroupUserResponse(

        Integer GroupId,
        Integer UserId
) {}
