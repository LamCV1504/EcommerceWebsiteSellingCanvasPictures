package com.webtranh.dto;


import com.webtranh.controller.order.models.OrderRequest;
import com.webtranh.controller.order.models.OrderResponse;
import com.webtranh.controller.order.models.OrderUpdate;
import com.webtranh.repository.order.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderEntity toEntity(OrderRequest dto);
    OrderResponse toDto(OrderEntity entity);
    List<OrderResponse> toDto(List<OrderEntity> entity);
    void updateExisted(OrderUpdate dto, @MappingTarget OrderEntity entity);
}
