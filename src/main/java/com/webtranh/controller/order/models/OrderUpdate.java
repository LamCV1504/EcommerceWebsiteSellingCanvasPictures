package com.webtranh.controller.order.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.webtranh.model.enums.EOrderStatus;
import com.webtranh.model.enums.EStatus;

import java.time.LocalDateTime;

public record OrderUpdate(
        EOrderStatus orderStatus,
        Integer employeeId
) {}
