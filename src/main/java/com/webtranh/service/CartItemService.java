package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.cart_item.models.CartItemRequest;
import com.webtranh.controller.cart_item.models.CartItemResponse;
import com.webtranh.controller.cart_item.models.CartItemUpdate;
import com.webtranh.controller.cart_item.models.ProductItem;
import com.webtranh.dto.CartItemMapper;
import com.webtranh.dto.ProductMapper;
import com.webtranh.repository.cart_item.CartItemEntity;
import com.webtranh.repository.cart_item.CartItemRepository;
import com.webtranh.repository.product.ProductEntity;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartItemService {

    @NonNull
    final CartItemRepository cartItemRepository;
    @NonNull final CartItemMapper cartItemMapper;
    @NonNull final ProductMapper productMapper;

    public void addNewCartItem(CartItemRequest cartItem) {
        Optional<CartItemEntity> foundCartItem = cartItemRepository
                .findByUserIdAndProductId(cartItem.userId(), cartItem.productId());
        if(foundCartItem.isPresent()) {
            foundCartItem.get().setQuantity(foundCartItem.get().getQuantity() + cartItem.quantity());
            cartItemRepository.save(foundCartItem.get());
        } else {
            cartItemRepository.save(cartItemMapper.toEntity(cartItem));
        }
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

    public List<ProductItem> getCartItemPaging(Integer userId) {
//        Page<CartItemEntity> foundCartItem = cartItemRepository.findAll(pageRequest);
        List<Object[]> foundCart = cartItemRepository.findAllByUserId(userId);
        return foundCart.stream()
                .map(data -> productMapper.toDto((ProductEntity) data[0],(Integer) data[1], (Integer) data[2], (Long) data[3], (Integer) data[4]))
                .toList();
    }
}
