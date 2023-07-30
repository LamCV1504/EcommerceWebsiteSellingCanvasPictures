package com.webtranh.controller.promotion_detail;

import com.webtranh.controller.promotion_detail.models.PromotionDetailRequest;
import com.webtranh.controller.promotion_detail.models.PromotionDetailResponse;
import com.webtranh.controller.promotion_detail.models.PromotionDetailUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/promotion_details")
@Tag(name = "promotion_details", description = "Promotion Details API")
public interface PromotionDetailAPI {

    @GetMapping("/{promotiondetailId}")
    PromotionDetailResponse getPromotionDetailById(@PathVariable Integer promotiondetailId);

    @GetMapping
    Page<PromotionDetailResponse> getPromotionDetailPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewPromotionDetail(@RequestBody @Valid PromotionDetailRequest promotion_detail);

    @PatchMapping("/{promotiondetailId}")
    void changePromotionDetailInfo(@PathVariable Integer promotiondetailId, @RequestBody @Valid PromotionDetailUpdate promotion_detail);

    @DeleteMapping("/{promotiondetailId}")
    void deletePromotionDetail(@PathVariable Integer promotiondetailId);
}
