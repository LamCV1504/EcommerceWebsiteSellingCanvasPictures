package com.webtranh.controller.promotion;

import com.webtranh.controller.promotion.models.PromotionRequest;
import com.webtranh.controller.promotion.models.PromotionResponse;
import com.webtranh.controller.promotion.models.PromotionUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/promotions")
@Tag(name = "promotions", description = "Promotion API")
public interface PromotionAPI {

    @GetMapping("/{promotionId}")
    PromotionResponse getPromotionById(@PathVariable Integer promotionId);

    @GetMapping
    Page<PromotionResponse> getPromotionPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewPromotion(@RequestBody @Valid PromotionRequest promotion);

    @PatchMapping("/{PromotionId}")
    void changePromotionInfo(@PathVariable Integer promotionId, @RequestBody @Valid PromotionUpdate promotion);

    @DeleteMapping("/{PromotionId}")
    void deletePromotion(@PathVariable Integer promotionId);
}
