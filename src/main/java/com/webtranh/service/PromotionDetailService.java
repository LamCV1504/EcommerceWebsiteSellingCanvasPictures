package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.promotion_detail.models.PromotionDetailRequest;
import com.webtranh.controller.promotion_detail.models.PromotionDetailResponse;
import com.webtranh.controller.promotion_detail.models.PromotionDetailUpdate;
import com.webtranh.controller.promotion_detail.models.PromotionDetailRequest;
import com.webtranh.controller.promotion.models.PromotionResponse;
import com.webtranh.controller.promotion.models.PromotionUpdate;
import com.webtranh.dto.PromotionDetailMapper;
import com.webtranh.dto.PromotionMapper;
import com.webtranh.repository.promotion.PromotionEntity;
import com.webtranh.repository.promotion.PromotionRepository;
import com.webtranh.repository.promotion_detail.PromotionDetailEntity;
import com.webtranh.repository.promotion_detail.PromotionDetailRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PromotionDetailService {

    @NonNull
    final PromotionDetailRepository promotionDetailRepository;
    @NonNull final PromotionDetailMapper promotionDetailMapper;

    public void addNewPromotionDetail(PromotionDetailRequest promotion_detail) {
        PromotionDetailEntity newPromotionDetail = promotionDetailMapper.toEntity(promotion_detail);
        promotionDetailRepository.save(promotionDetailMapper.toEntity(promotion_detail));
    }

    public PromotionDetailResponse getPromotionDetailById(Integer promotionDetailId) {
        return promotionDetailMapper.toDto(promotionDetailRepository.findById(promotionDetailId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public void changePromotionDetailInfo(Integer promotionDetailId, PromotionDetailUpdate promotion_detail) {
        PromotionDetailEntity foundPromotionDetail = promotionDetailRepository.findById(promotionDetailId).orElseThrow(ResourceNotFoundException::new);
        promotionDetailMapper.updateExisted(promotion_detail, foundPromotionDetail);
        promotionDetailRepository.save(foundPromotionDetail);
    }

    public void deletePromotionDetail(Integer promotionDetailId) {
        promotionDetailRepository.deleteById(promotionDetailId);
    }

      public Page<PromotionDetailResponse> getPromotionDetailPaging(PageRequest pageRequest) {
        Page<PromotionDetailEntity> foundPromotionDetail = promotionDetailRepository.findAll(pageRequest);
        return new PageImpl<>(promotionDetailMapper.toDto(foundPromotionDetail.getContent()),
                pageRequest,
                foundPromotionDetail.getTotalElements());
    }
}
