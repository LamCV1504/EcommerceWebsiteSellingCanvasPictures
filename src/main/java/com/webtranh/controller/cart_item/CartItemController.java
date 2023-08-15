package com.webtranh.controller.cart_item;

import com.webtranh.controller.cart_item.models.CartItemRequest;
import com.webtranh.controller.cart_item.models.CartItemResponse;
import com.webtranh.controller.cart_item.models.CartItemUpdate;
import com.webtranh.controller.cart_item.models.ProductItem;
import com.webtranh.service.CartItemService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartItemController implements CartItemAPI {

    @NonNull final CartItemService cartItemService;

    @Override
    public CartItemResponse getCartItemById(Integer cartItemId) {
        return cartItemService.getCartItemById(cartItemId);
    }


    @Override
    public List<ProductItem> getCartItemPaging(Integer userId) {
        return cartItemService.getCartItemPaging(userId);
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
    public void deleteCartItem(Integer cartItemId) {
        cartItemService.deleteCartItem(cartItemId);
    }
}
