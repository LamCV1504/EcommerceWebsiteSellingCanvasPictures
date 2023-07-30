package com.webtranh.controller.promotion_detail.models;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PromotionDetailResponse(
        Integer promotionId,
        Integer categoryId
) {}
