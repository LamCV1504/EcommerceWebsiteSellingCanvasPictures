package com.webtranh.controller.cart_item;

import com.webtranh.controller.cart_item.models.CartItemRequest;
import com.webtranh.controller.cart_item.models.CartItemResponse;
import com.webtranh.controller.cart_item.models.CartItemUpdate;
import com.webtranh.controller.cart_item.models.ProductItem;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/v1/cart")
@Tag(name = "cart_item", description = "Cart Item API")
public interface CartItemAPI {

    @GetMapping("/{cartItemId}")
    CartItemResponse getCartItemById(@PathVariable Integer cartItemId);

    @GetMapping("/user/{userId}")
    List<ProductItem> getCartItemPaging(@PathVariable Integer userId);

    @PostMapping
    void addNewCartItem(@RequestBody @Valid CartItemRequest cartItem);

    @PatchMapping("/{cartItemId}")
    void changeCartItemInfo(@PathVariable Integer cartItemId, @RequestBody @Valid CartItemUpdate cartItem);

    @DeleteMapping("/{cartItemId}")
    void deleteCartItem(@PathVariable Integer cartItemId);
}
