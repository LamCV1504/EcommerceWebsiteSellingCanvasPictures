package com.webtranh.controller.order.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.webtranh.model.enums.EOrderStatus;
import com.webtranh.model.enums.EStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record OrderResponse(
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
