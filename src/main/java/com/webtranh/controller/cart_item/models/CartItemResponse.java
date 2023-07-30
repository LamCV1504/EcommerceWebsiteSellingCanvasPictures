package com.webtranh.controller.cart_item.models;

public record CartItemResponse(
        Integer id,
        Integer userId,
        Integer productId,
        Integer quantity
) {}
