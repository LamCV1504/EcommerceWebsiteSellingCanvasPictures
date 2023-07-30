package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.order_detail.models.OrderDetailRequest;
import com.webtranh.controller.order_detail.models.OrderDetailResponse;
import com.webtranh.controller.order_detail.models.OrderDetailUpdate;
import com.webtranh.dto.OrderDetailMapper;
import com.webtranh.repository.order_detail.OrderDetailEntity;
import com.webtranh.repository.order_detail.OrderDetailRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDetailService {

    @NonNull
    final OrderDetailRepository orderDetailRepository;
    @NonNull final OrderDetailMapper orderDetailMapper;

    public void addNewOrderDetail(OrderDetailRequest orderDetail) {
        OrderDetailEntity newOrderDetail = orderDetailMapper.toEntity(orderDetail);
        orderDetailRepository.save(orderDetailMapper.toEntity(orderDetail));
    }

    public OrderDetailResponse getOrderDetailById(Integer orderDetailId) {
        return orderDetailMapper.toDto(orderDetailRepository.findById(orderDetailId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public void changeOrderDetailInfo(Integer orderDetailId, OrderDetailUpdate orderDetail) {
        OrderDetailEntity foundOrderDetail = orderDetailRepository.findById(orderDetailId).orElseThrow(ResourceNotFoundException::new);
        orderDetailMapper.updateExisted(orderDetail, foundOrderDetail);
        orderDetailRepository.save(foundOrderDetail);
    }

    public void deleteOrderDetail(Integer orderDetailId) {
        orderDetailRepository.deleteById(orderDetailId);
    }

    public Page<OrderDetailResponse> getOrderDetailPaging(PageRequest pageRequest) {
        Page<OrderDetailEntity> foundOrderDetail = orderDetailRepository.findAll(pageRequest);
        return new PageImpl<>(orderDetailMapper.toDto(foundOrderDetail.getContent()),
                pageRequest,
                foundOrderDetail.getTotalElements());
    }
}
