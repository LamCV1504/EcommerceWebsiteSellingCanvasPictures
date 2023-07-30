package com.webtranh.controller.cart_item.models;

public record CartItemUpdate(
        Integer id,
        Integer userId,
        Integer productId,
        Integer quantity
) {}
