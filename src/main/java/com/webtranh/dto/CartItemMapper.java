package com.webtranh.dto;


import com.webtranh.controller.cart_item.models.CartItemRequest;
import com.webtranh.controller.cart_item.models.CartItemResponse;
import com.webtranh.controller.cart_item.models.CartItemUpdate;
import com.webtranh.repository.cart_item.CartItemEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    CartItemEntity toEntity(CartItemRequest dto);
    CartItemResponse toDto(CartItemEntity entity);
    List<CartItemResponse> toDto(List<CartItemEntity> entity);
    void updateExisted(CartItemUpdate dto, @MappingTarget CartItemEntity entity);
}
