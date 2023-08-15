package com.webtranh.dto;


import com.webtranh.controller.cart_item.models.ProductItem;
import com.webtranh.controller.order_detail.models.OrderDetailRequest;
import com.webtranh.controller.order_detail.models.OrderDetailResponse;
import com.webtranh.controller.order_detail.models.OrderDetailUpdate;
import com.webtranh.controller.order_detail.models.ProductOrderDetail;
import com.webtranh.controller.product.models.ProductCategory;
import com.webtranh.repository.order_detail.OrderDetailEntity;
import com.webtranh.repository.product.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    OrderDetailEntity toEntity(OrderDetailRequest dto);
    OrderDetailResponse toDto(OrderDetailEntity entity);
    List<OrderDetailResponse> toDto(List<OrderDetailEntity> entity);

    ProductOrderDetail toDto(OrderDetailEntity entity, String productName, Integer discount, Integer unitPrice);
    ProductOrderDetail toDto(OrderDetailEntity entity, String productName);
    void updateExisted(OrderDetailUpdate dto, @MappingTarget OrderDetailEntity entity);

}
