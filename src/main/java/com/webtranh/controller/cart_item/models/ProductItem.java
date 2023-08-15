package com.webtranh.controller.cart_item.models;

public record ProductItem(
        Integer productId,
        String productName,
        Integer unitPrice,
        String image,
        Long total,
        Integer quantity,

        Integer discount,
        Integer id
) {}
