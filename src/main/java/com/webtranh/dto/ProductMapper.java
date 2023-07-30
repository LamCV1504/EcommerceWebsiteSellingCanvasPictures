package com.webtranh.dto;


import com.webtranh.controller.product.models.ProductRequest;
import com.webtranh.controller.product.models.ProductResponse;
import com.webtranh.controller.product.models.ProductUpdate;
import com.webtranh.repository.product.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper{

    ProductEntity toEntity(ProductRequest dto);
    ProductResponse toDto(ProductEntity entity);
    List<ProductResponse> toDto(List<ProductEntity> entity);
    void updateExisted(ProductUpdate dto, @MappingTarget ProductEntity entity);
}
