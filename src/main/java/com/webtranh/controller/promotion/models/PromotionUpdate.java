package com.webtranh.controller.promotion.models;

import com.webtranh.model.enums.EStatus;

import java.time.LocalDate;

public record PromotionUpdate(
        Integer promotionId,
        String promotionName,
        LocalDate startDate,
        LocalDate endDate,
        Integer discount,
        Integer userId
) {}
