package com.webtranh.controller.order_detail;

import com.webtranh.controller.order_detail.models.OrderDetailRequest;
import com.webtranh.controller.order_detail.models.OrderDetailResponse;
import com.webtranh.controller.order_detail.models.OrderDetailUpdate;
import com.webtranh.service.OrderDetailService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderDetailController implements OrderDetailAPI {

    @NonNull final OrderDetailService orderDetailService;

    @Override
    public OrderDetailResponse getOrderDetailById(Integer orderDetailId) {
        return orderDetailService.getOrderDetailById(orderDetailId);
    }


    @Override
    public Page<OrderDetailResponse> getOrderDetailPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return orderDetailService.getOrderDetailPaging(pageRequest);
    }

    @Override
    public void addNewOrderDetail(OrderDetailRequest orderDetail) {
        orderDetailService.addNewOrderDetail(orderDetail);
    }

    @Override
    public void changeOrderDetailInfo(Integer orderDetailId, OrderDetailUpdate orderDetail) {
        orderDetailService.changeOrderDetailInfo(orderDetailId, orderDetail);
    }

    @Override
    public void deleteOrder(Integer orderId) {
        orderDetailService.deleteOrderDetail(orderId);
    }
}
