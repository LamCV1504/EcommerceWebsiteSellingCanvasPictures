package com.webtranh.controller.order_detail;

import com.webtranh.controller.cart_item.models.ProductItem;
import com.webtranh.controller.order_detail.models.OrderDetailRequest;
import com.webtranh.controller.order_detail.models.OrderDetailResponse;
import com.webtranh.controller.order_detail.models.OrderDetailUpdate;
import com.webtranh.controller.order_detail.models.ProductOrderDetail;
import com.webtranh.controller.product.models.ProductCategory;
import com.webtranh.service.OrderDetailService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderDetailController implements OrderDetailAPI {

    @NonNull final OrderDetailService orderDetailService;

    @Override
    public OrderDetailResponse getOrderDetailById(Integer orderDetailId) {
        return orderDetailService.getOrderDetailById(orderDetailId);
    }
    public List<ProductOrderDetail> getOrderDetailByOrderId(Integer orderId){
        return orderDetailService.getOrderDetailByOrderId(orderId);
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
