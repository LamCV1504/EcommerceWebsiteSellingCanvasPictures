package com.webtranh.controller.order;

import com.webtranh.controller.order.models.OrderRequest;
import com.webtranh.controller.order.models.OrderResponse;
import com.webtranh.controller.order.models.OrderUpdate;
import com.webtranh.service.OrderService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController implements OrderAPI {

    @NonNull final OrderService orderService;

    @Override
    public OrderResponse getOrderById(Integer orderId) {
        return orderService.getOrderById(orderId);
    }


    @Override
    public Page<OrderResponse> getOrderPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return orderService.getOrderPaging(pageRequest);
    }

    @Override
    public void addNewOrder(OrderRequest order) {
        orderService.addNewOrder(order);
    }

    @Override
    public void changeOrderInfo(Integer orderId, OrderUpdate order) {
        orderService.changeOrderInfo(orderId, order);
    }

    @Override
    public void deleteOrder(Integer orderId) {
        orderService.deleteOrder(orderId);
    }
}
