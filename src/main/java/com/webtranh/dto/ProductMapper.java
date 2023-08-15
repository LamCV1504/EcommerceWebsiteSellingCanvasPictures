package com.webtranh.dto;


import com.webtranh.controller.cart_item.models.ProductItem;
import com.webtranh.controller.product.models.*;
import com.webtranh.repository.product.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper{

    ProductEntity updateQuantity(Integer quantity, @MappingTarget ProductEntity entity);
    ProductEntity toEntity(ProductRequest dto);
    ProductResponse toDto(ProductEntity entity);
    // List<ProductResponse> toDto(List<ProductEntity> entity);
    // List<ProductCategoryResponse> toDto(List<ProductEntity> entity);
    void updateExisted(ProductUpdate dto, @MappingTarget ProductEntity entity);

    ProductCategory toDto(ProductEntity product, String categoryName, String author, String categoryDescription, Integer discount);

    @Mapping(source = "quantity", target = "quantity")
//    @Mapping(source ="id", target = "id")
    ProductItem toDto(ProductEntity product, Integer id, Integer quantity, Long total, Integer discount);
}
