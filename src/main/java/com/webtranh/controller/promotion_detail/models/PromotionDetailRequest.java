package com.webtranh.controller.promotion_detail.models;

import jakarta.validation.constraints.NotNull;

public record PromotionDetailRequest(
        @NotNull Integer promotionId,
        @NotNull Integer categoryId
) {}

