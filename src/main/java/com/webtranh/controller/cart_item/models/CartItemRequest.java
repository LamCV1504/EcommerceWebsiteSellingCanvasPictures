package com.webtranh.controller.cart_item.models;

import jakarta.validation.constraints.NotNull;


public record CartItemRequest(

        @NotNull Integer userId,
        @NotNull Integer productId,
        @NotNull Integer quantity
) {}

