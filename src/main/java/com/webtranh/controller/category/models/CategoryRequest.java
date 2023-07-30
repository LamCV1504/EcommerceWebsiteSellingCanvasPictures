package com.webtranh.controller.category.models;

import jakarta.validation.constraints.NotNull;


public record CategoryRequest(
        @NotNull String categoryName,
        @NotNull String image,

        @NotNull String categoryDescription,
        @NotNull String author
) {}

