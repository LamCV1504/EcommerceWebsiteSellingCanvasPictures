package com.webtranh.controller.promotion_detail.models;

import java.time.LocalDate;

public record PromotionDetailUpdate(
        Integer promotionId,
        Integer categoryId
) {}
