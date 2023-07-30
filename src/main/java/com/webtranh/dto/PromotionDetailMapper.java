package com.webtranh.dto;

import com.webtranh.controller.promotion_detail.models.PromotionDetailRequest;
import com.webtranh.controller.promotion_detail.models.PromotionDetailResponse;
import com.webtranh.controller.promotion_detail.models.PromotionDetailUpdate;
import com.webtranh.repository.promotion_detail.PromotionDetailEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PromotionDetailMapper {
    PromotionDetailEntity toEntity(PromotionDetailRequest dto);
    PromotionDetailResponse toDto(PromotionDetailEntity entity);
    List<PromotionDetailResponse> toDto(List<PromotionDetailEntity> entity);
    void updateExisted(PromotionDetailUpdate dto, @MappingTarget PromotionDetailEntity entity);
}
