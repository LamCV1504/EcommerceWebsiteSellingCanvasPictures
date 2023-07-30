package com.webtranh.dto;


import com.webtranh.controller.category.models.CategoryRequest;
import com.webtranh.controller.category.models.CategoryUpdate;
import com.webtranh.controller.category.models.CategoryResponse;
import com.webtranh.repository.category.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryEntity toEntity(CategoryRequest dto);
    CategoryResponse toDto(CategoryEntity entity);
    List<CategoryResponse> toDto(List<CategoryEntity> entity);
    void updateExisted(CategoryUpdate dto, @MappingTarget CategoryEntity entity);
}
