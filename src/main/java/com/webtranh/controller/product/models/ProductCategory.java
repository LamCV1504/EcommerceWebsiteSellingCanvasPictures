package com.webtranh.controller.product.models;

import com.webtranh.repository.product.ProductEntity;

public record ProductCategory(
        ProductEntity product,
        String categoryName,
        String author,
        String categoryDescription,
        Integer discount
) {}
