package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.promotion.models.PromotionRequest;
import com.webtranh.controller.promotion.models.PromotionResponse;
import com.webtranh.controller.promotion.models.PromotionUpdate;
import com.webtranh.dto.PromotionMapper;
import com.webtranh.repository.promotion.PromotionEntity;
import com.webtranh.repository.promotion.PromotionRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PromotionService {

    @NonNull
    final PromotionRepository promotionRepository;
    @NonNull final PromotionMapper promotionMapper;

    public void addNewPromotion(PromotionRequest promotion) {
        PromotionEntity newPromotion = promotionMapper.toEntity(promotion);
        promotionRepository.save(promotionMapper.toEntity(promotion));
    }

    public PromotionResponse getPromotionById(Integer promotionId) {
        return promotionMapper.toDto(promotionRepository.findById(promotionId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public void changePromotionInfo(Integer promotionId, PromotionUpdate promotion) {
        PromotionEntity foundPromotion = promotionRepository.findById(promotionId).orElseThrow(ResourceNotFoundException::new);
        promotionMapper.updateExisted(promotion, foundPromotion);
        promotionRepository.save(foundPromotion);
    }

    public void deletePromotion(Integer promotionId) {
        promotionRepository.deleteById(promotionId);
    }

      public Page<PromotionResponse> getPromotionPaging(PageRequest pageRequest) {
        Page<PromotionEntity> foundPromotion = promotionRepository.findAll(pageRequest);
        return new PageImpl<>(promotionMapper.toDto(foundPromotion.getContent()),
                pageRequest,
                foundPromotion.getTotalElements());
    }
}
