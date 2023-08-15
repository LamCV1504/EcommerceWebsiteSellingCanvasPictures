package com.webtranh.controller.product.models;

import com.webtranh.model.enums.EStatus;

public record ProductCategoryResponse(
        Integer productId,
        String productName,
        String productDescription,
        EStatus productStatus,
        Integer unitPrice,
        Integer quantity,
        String categoryName,
        String categoryDescription,
        String author,
        String image
) {}
