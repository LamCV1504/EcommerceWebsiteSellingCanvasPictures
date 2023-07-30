package com.webtranh.controller.group.models;

import jakarta.validation.constraints.NotNull;

public record GroupRequest(
        @NotNull String groupName
) {}


