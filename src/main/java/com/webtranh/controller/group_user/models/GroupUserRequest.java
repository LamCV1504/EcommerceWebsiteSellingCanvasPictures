package com.webtranh.controller.group_user.models;

import jakarta.validation.constraints.NotNull;

public record GroupUserRequest(
        @NotNull Integer GroupId,
        @NotNull Integer UserId
) {}


