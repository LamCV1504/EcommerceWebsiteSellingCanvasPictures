package com.webtranh.dto;


import com.webtranh.controller.order_detail.models.OrderDetailRequest;
import com.webtranh.controller.order_detail.models.OrderDetailResponse;
import com.webtranh.controller.order_detail.models.OrderDetailUpdate;
import com.webtranh.repository.order_detail.OrderDetailEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    OrderDetailEntity toEntity(OrderDetailRequest dto);
    OrderDetailResponse toDto(OrderDetailEntity entity);
    List<OrderDetailResponse> toDto(List<OrderDetailEntity> entity);
    void updateExisted(OrderDetailUpdate dto, @MappingTarget OrderDetailEntity entity);
}
