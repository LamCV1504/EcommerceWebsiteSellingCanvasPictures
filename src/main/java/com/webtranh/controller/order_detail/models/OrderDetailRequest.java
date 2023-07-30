package com.webtranh.controller.order_detail.models;

import com.webtranh.model.enums.EOrderStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;


public record OrderDetailRequest(

        @NotNull Integer orderId,
        @NotNull Integer productId,
        @NotNull Integer quantity
) {}

