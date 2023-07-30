package com.webtranh.controller.cart_item;

import com.webtranh.controller.cart_item.models.CartItemRequest;
import com.webtranh.controller.cart_item.models.CartItemResponse;
import com.webtranh.controller.cart_item.models.CartItemUpdate;
import com.webtranh.service.CartItemService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CartItemController implements CartItemAPI {

    @NonNull final CartItemService cartItemService;

    @Override
    public CartItemResponse getCartItemById(Integer cartItemId) {
        return cartItemService.getCartItemById(cartItemId);
    }


    @Override
    public Page<CartItemResponse> getCartItemPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return cartItemService.getCartItemPaging(pageRequest);
    }

    @Override
    public void addNewCartItem(CartItemRequest cartItem) {
        cartItemService.addNewCartItem(cartItem);
    }

    @Override
    public void changeCartItemInfo(Integer cartItemId, CartItemUpdate cartItem) {
        cartItemService.changeCartItemInfo(cartItemId, cartItem);
    }

    @Override
    public void deleteOrder(Integer orderId) {
        cartItemService.deleteCartItem(orderId);
    }
}
