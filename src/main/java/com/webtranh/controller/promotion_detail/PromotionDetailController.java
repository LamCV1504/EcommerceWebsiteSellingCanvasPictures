package com.webtranh.controller.promotion_detail;

import com.webtranh.controller.promotion_detail.models.PromotionDetailRequest;
import com.webtranh.controller.promotion_detail.models.PromotionDetailResponse;
import com.webtranh.controller.promotion_detail.models.PromotionDetailUpdate;
import com.webtranh.service.PromotionDetailService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PromotionDetailController implements PromotionDetailAPI {

    @NonNull final PromotionDetailService promotionDetailService;

    @Override
    public PromotionDetailResponse getPromotionDetailById(Integer promotionDetailId) {
        return promotionDetailService.getPromotionDetailById(promotionDetailId);
    }


    @Override
    public Page<PromotionDetailResponse> getPromotionDetailPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return promotionDetailService.getPromotionDetailPaging(pageRequest);
    }

    @Override
    public void addNewPromotionDetail(PromotionDetailRequest promotion_detail) {
        promotionDetailService.addNewPromotionDetail(promotion_detail);
    }

    @Override
    public void changePromotionDetailInfo(Integer promotionDetailId, PromotionDetailUpdate promotion_detail){
        promotionDetailService.changePromotionDetailInfo(promotionDetailId, promotion_detail);
    }

    @Override
    public void deletePromotionDetail(Integer promotionDetailId) {
        promotionDetailService.deletePromotionDetail(promotionDetailId);
    }
}
