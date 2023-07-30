package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.order.models.OrderRequest;
import com.webtranh.controller.order.models.OrderResponse;
import com.webtranh.controller.order.models.OrderUpdate;
import com.webtranh.dto.OrderMapper;
import com.webtranh.repository.order.OrderEntity;
import com.webtranh.repository.order.OrderRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    @NonNull
    final OrderRepository orderRepository;
    @NonNull final OrderMapper orderMapper;

    public void addNewOrder(OrderRequest order) {
        OrderEntity newOrder = orderMapper.toEntity(order);
        orderRepository.save(orderMapper.toEntity(order));
    }

    public OrderResponse getOrderById(Integer orderId) {
        return orderMapper.toDto(orderRepository.findById(orderId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public void changeOrderInfo(Integer orderId, OrderUpdate order) {
        OrderEntity foundOrder = orderRepository.findById(orderId).orElseThrow(ResourceNotFoundException::new);
        orderMapper.updateExisted(order, foundOrder);
        orderRepository.save(foundOrder);
    }

    public void deleteOrder(Integer orderId) {
        orderRepository.deleteById(orderId);
    }

    public Page<OrderResponse> getOrderPaging(PageRequest pageRequest) {
        Page<OrderEntity> foundOrder = orderRepository.findAll(pageRequest);
        return new PageImpl<>(orderMapper.toDto(foundOrder.getContent()),
                pageRequest,
                foundOrder.getTotalElements());
    }
}
