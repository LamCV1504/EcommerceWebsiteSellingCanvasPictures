package com.webtranh.controller.category.models;

import jakarta.validation.constraints.NotNull;

public record CategoryUpdate(
        Integer categoryId,
        String categoryName,
        String image,
        String categoryDescription,
        String author
) {}
