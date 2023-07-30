package com.webtranh.dto;

import com.webtranh.controller.promotion.models.PromotionRequest;
import com.webtranh.controller.promotion.models.PromotionResponse;
import com.webtranh.controller.promotion.models.PromotionUpdate;
import com.webtranh.repository.promotion.PromotionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PromotionMapper {
    PromotionEntity toEntity(PromotionRequest dto);
    PromotionResponse toDto(PromotionEntity entity);
    List<PromotionResponse> toDto(List<PromotionEntity> entity);
    void updateExisted(PromotionUpdate dto, @MappingTarget PromotionEntity entity);
}
