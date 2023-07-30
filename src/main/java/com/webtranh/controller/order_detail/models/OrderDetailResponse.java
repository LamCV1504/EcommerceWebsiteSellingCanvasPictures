package com.webtranh.controller.order_detail.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.webtranh.model.enums.EOrderStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record OrderDetailResponse(
        Integer id,
        Integer orderId,
        Integer productId,
        Integer quantity
) {}
