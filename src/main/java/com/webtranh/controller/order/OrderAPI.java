package com.webtranh.controller.order;

import com.webtranh.controller.order.models.OrderRequest;
import com.webtranh.controller.order.models.OrderResponse;
import com.webtranh.controller.order.models.OrderUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/orders")
@Tag(name = "order", description = "Order API")
public interface OrderAPI {

    @GetMapping("/{orderId}")
    OrderResponse getOrderById(@PathVariable Integer orderId);

    @GetMapping
    Page<OrderResponse> getOrderPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewOrder(@RequestBody @Valid OrderRequest order);

    @PatchMapping("/{orderId}")
    void changeOrderInfo(@PathVariable Integer orderId, @RequestBody @Valid OrderUpdate order);

    @DeleteMapping("/{orderId}")
    void deleteOrder(@PathVariable Integer orderId);
}
