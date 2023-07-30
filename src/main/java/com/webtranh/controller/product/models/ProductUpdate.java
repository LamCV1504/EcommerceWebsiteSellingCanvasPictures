package com.webtranh.controller.product.models;

import com.webtranh.model.enums.EStatus;

public record ProductUpdate(
        Integer productId,
        String productName,
        String productDescription,
        EStatus productStatus,
        Integer unitPrice,
        Integer quantity,
        Integer categoryId,
        String image
) {}
