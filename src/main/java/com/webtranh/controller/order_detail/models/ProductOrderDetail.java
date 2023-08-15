package com.webtranh.controller.order_detail.models;

import com.webtranh.repository.order_detail.OrderDetailEntity;

public record ProductOrderDetail(
        Integer id,
        Integer orderId,
        Integer productId,
        Integer quantity,
        Integer price,
        Integer discount,
        String productName
) {}
