package com.webtranh.controller.promotion.models;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;


public record PromotionRequest(
        @NotNull String promotionName,
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        @NotNull String image,
        @NotNull Integer discount,
        @NotNull Integer userId
) {}

