package com.webtranh.controller.promotion;

import com.webtranh.controller.promotion.models.PromotionRequest;
import com.webtranh.controller.promotion.models.PromotionResponse;
import com.webtranh.controller.promotion.models.PromotionUpdate;
import com.webtranh.service.PromotionService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PromotionController implements PromotionAPI {

    @NonNull final PromotionService promotionService;

    @Override
    public PromotionResponse getPromotionById(Integer promotionId) {
        return promotionService.getPromotionById(promotionId);
    }


    @Override
    public Page<PromotionResponse> getPromotionPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return promotionService.getPromotionPaging(pageRequest);
    }

    @Override
    public void addNewPromotion(PromotionRequest promotion) {
        promotionService.addNewPromotion(promotion);
    }

    @Override
    public void changePromotionInfo(Integer promotionId, PromotionUpdate promotion) {
        promotionService.changePromotionInfo(promotionId, promotion);
    }

    @Override
    public void deletePromotion(Integer promotionId) {
        promotionService.deletePromotion(promotionId);
    }
}
