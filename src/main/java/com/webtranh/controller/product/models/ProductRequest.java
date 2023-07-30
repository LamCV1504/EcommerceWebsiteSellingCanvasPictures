package com.webtranh.controller.product.models;

import com.webtranh.model.enums.EStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record ProductRequest(
        @NotNull String productName,
        @NotNull String productDescription,
        @NotNull String image,
        @Enumerated(EnumType.STRING)
        @NotNull EStatus productStatus,
        @NotNull Integer unitPrice,
        @NotNull Integer quantity,
        @NotNull Integer categoryId
) {}

