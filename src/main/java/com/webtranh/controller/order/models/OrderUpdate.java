package com.webtranh.controller.order.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.webtranh.model.enums.EOrderStatus;
import com.webtranh.model.enums.EStatus;

import java.time.LocalDateTime;

public record OrderUpdate(
        Integer customerId,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime purchaseTime,
        EOrderStatus orderStatus,
        String shippingAddress,
        String consigneePhone,
        String consigneeName,
        Integer employeeId,
        String notes
) {}
