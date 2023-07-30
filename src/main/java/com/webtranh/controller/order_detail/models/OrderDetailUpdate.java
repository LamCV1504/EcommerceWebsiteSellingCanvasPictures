package com.webtranh.controller.order_detail.models;

public record OrderDetailUpdate(
        Integer id,
        Integer orderId,
        Integer productId,
        Integer quantity
) {}
