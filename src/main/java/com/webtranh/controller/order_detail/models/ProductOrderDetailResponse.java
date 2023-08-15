package com.webtranh.controller.order_detail.models;

public record ProductOrderDetailResponse(
        Integer id,
        Integer orderId,
        Integer productId,
        Integer quantity,
        String productName,
        Integer unitPrice
) {}
