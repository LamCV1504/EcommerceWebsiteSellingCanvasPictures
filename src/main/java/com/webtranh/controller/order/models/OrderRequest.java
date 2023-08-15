package com.webtranh.controller.order.models;

import com.webtranh.model.enums.EOrderStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;


public record OrderRequest(
        @NotNull Integer customerId,
        @NotNull String shippingAddress,
        @NotNull String consigneePhone,
        @NotNull String consigneeName,
        String notes
) {}

