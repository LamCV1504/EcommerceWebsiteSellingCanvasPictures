package com.webtranh.controller.promotion.models;

import java.time.LocalDate;

public record PromotionResponse(
        Integer promotionId,
        String promotionName,
        LocalDate startDate,
        LocalDate endDate,
        Integer discount,
        Integer userId
) {}
