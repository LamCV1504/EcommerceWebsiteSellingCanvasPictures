package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.cart_item.models.CartItemRequest;
import com.webtranh.controller.cart_item.models.CartItemResponse;
import com.webtranh.controller.cart_item.models.CartItemUpdate;
import com.webtranh.dto.CartItemMapper;
import com.webtranh.repository.cart_item.CartItemEntity;
import com.webtranh.repository.cart_item.CartItemRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemService {

    @NonNull
    final CartItemRepository cartItemRepository;
    @NonNull final CartItemMapper cartItemMapper;

    public void addNewCartItem(CartItemRequest cartItem) {
        CartItemEntity newCartItem = cartItemMapper.toEntity(cartItem);
        cartItemRepository.save(cartItemMapper.toEntity(cartItem));
    }

    public CartItemResponse getCartItemById(Integer cartItemId) {
        return cartItemMapper.toDto(cartItemRepository.findById(cartItemId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public void changeCartItemInfo(Integer cartItemId, CartItemUpdate cartItem) {
        CartItemEntity foundCartItem = cartItemRepository.findById(cartItemId).orElseThrow(ResourceNotFoundException::new);
        cartItemMapper.updateExisted(cartItem, foundCartItem);
        cartItemRepository.save(foundCartItem);
    }

    public void deleteCartItem(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public Page<CartItemResponse> getCartItemPaging(PageRequest pageRequest) {
        Page<CartItemEntity> foundCartItem = cartItemRepository.findAll(pageRequest);
        return new PageImpl<>(cartItemMapper.toDto(foundCartItem.getContent()),
                pageRequest,
                foundCartItem.getTotalElements());
    }
}
