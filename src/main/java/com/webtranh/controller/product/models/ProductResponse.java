package com.webtranh.controller.product.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.webtranh.model.enums.EStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;

public record ProductResponse(
        Integer productId,
        String productName,
        String productDescription,
        EStatus productStatus,
        Integer unitPrice,
        Integer quantity,
        Integer categoryId,
        String image
) {}
