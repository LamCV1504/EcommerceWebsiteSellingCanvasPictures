package com.webtranh.controller.order_detail;

import com.webtranh.controller.order_detail.models.OrderDetailRequest;
import com.webtranh.controller.order_detail.models.OrderDetailResponse;
import com.webtranh.controller.order_detail.models.OrderDetailUpdate;
import com.webtranh.controller.order_detail.models.ProductOrderDetail;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/v1/order_details")
@Tag(name = "order_detail", description = "Order Detail API")
public interface OrderDetailAPI {

    @GetMapping("/{orderDetailId}")
    OrderDetailResponse getOrderDetailById(@PathVariable Integer orderDetailId);

    @GetMapping("/order/{orderId}")
    List<ProductOrderDetail> getOrderDetailByOrderId(@PathVariable Integer orderId);

    @GetMapping
    Page<OrderDetailResponse> getOrderDetailPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewOrderDetail(@RequestBody @Valid OrderDetailRequest orderDetail);

    @PatchMapping("/{orderDetailId}")
    void changeOrderDetailInfo(@PathVariable Integer orderDetailId, @RequestBody @Valid OrderDetailUpdate orderDetail);

    @DeleteMapping("/{orderId}")
    void deleteOrder(@PathVariable Integer orderId);
}
