package com.webtranh.controller.cart_item;

import com.webtranh.controller.cart_item.models.CartItemRequest;
import com.webtranh.controller.cart_item.models.CartItemResponse;
import com.webtranh.controller.cart_item.models.CartItemUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/cart_items")
@Tag(name = "cart_item", description = "Cart Item API")
public interface CartItemAPI {

    @GetMapping("/{cartItemId}")
    CartItemResponse getCartItemById(@PathVariable Integer cartItemId);

    @GetMapping
    Page<CartItemResponse> getCartItemPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewCartItem(@RequestBody @Valid CartItemRequest cartItem);

    @PatchMapping("/{cartItemId}")
    void changeCartItemInfo(@PathVariable Integer cartItemId, @RequestBody @Valid CartItemUpdate cartItem);

    @DeleteMapping("/{orderId}")
    void deleteOrder(@PathVariable Integer orderId);
}
