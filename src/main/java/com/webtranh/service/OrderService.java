package com.webtranh.service;

import com.webtranh.config.exception.RequestInvalidException;
import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.cart_item.models.ProductItem;
import com.webtranh.controller.order.models.OrderRequest;
import com.webtranh.controller.order.models.OrderResponse;
import com.webtranh.controller.order.models.OrderUpdate;
import com.webtranh.dto.CartItemMapper;
import com.webtranh.dto.OrderMapper;
import com.webtranh.dto.ProductMapper;
import com.webtranh.model.enums.EOrderStatus;
import com.webtranh.model.enums.EStatus;
import com.webtranh.repository.cart_item.CartItemEntity;
import com.webtranh.repository.cart_item.CartItemRepository;
import com.webtranh.repository.order.OrderEntity;
import com.webtranh.repository.order.OrderRepository;
import com.webtranh.repository.order_detail.OrderDetailEntity;
import com.webtranh.repository.order_detail.OrderDetailRepository;
import com.webtranh.repository.product.ProductEntity;
import com.webtranh.repository.product.ProductRepository;
import com.webtranh.repository.promotion.PromotionEntity;
import com.webtranh.repository.promotion.PromotionRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

record ProductPromotion(Integer productId, Integer discount){}

@Service
@RequiredArgsConstructor
public class OrderService {

    @NonNull
    final OrderRepository orderRepository;
    @NonNull final OrderMapper orderMapper;
    @NonNull final CartItemRepository cartItemRepository;
    @NonNull final ProductMapper productMapper;
    @NonNull final OrderDetailRepository orderDetailRepository;
    @NonNull final PromotionRepository promotionRepository;
    @NonNull final ProductRepository productRepository;

    @Transactional
    public void addNewOrder(OrderRequest order) {
        List<ProductItem> foundCart = cartItemRepository.findAllByUserId(order.customerId())
                .stream().map(data -> productMapper.toDto((ProductEntity) data[0],(Integer) data[1], (Integer) data[2], (Long) data[3], (Integer) data[4]))
                .toList();

        Map<Integer, Integer> cart = foundCart.stream().collect(Collectors.toMap(ProductItem::productId, ProductItem::quantity));
        List<ProductEntity> products = productRepository.findAllById(foundCart.stream().map(ProductItem::productId).collect(Collectors.toList()));
        products.stream().forEach(xx -> {
           if(xx.getQuantity() < cart.get(xx.getProductId())) {
               throw new RequestInvalidException(String.format("Số lượng sản phẩm '%s' không đủ", xx.getProductName()));
           }
        });
        productRepository.saveAll(products.stream().map(xx -> productMapper.updateQuantity(xx.getQuantity()-cart.get(xx.getProductId()), xx)).toList());

        Map<Integer, Integer> foundPromotion = promotionRepository.findByProductId(foundCart.stream().map(ProductItem::productId).toList(), LocalDate.now())
                .stream().map(data -> new ProductPromotion((Integer)data[0],(Integer) data[1]))
                .collect(Collectors.toMap(ProductPromotion::productId, ProductPromotion::discount));
        List<OrderDetailEntity> newOrderDetail = foundCart.stream()
                                                  .map(item -> OrderDetailEntity.builder()
                                                                                .productId(item.productId())
                                                                                .quantity(item.quantity())
                                                                                .discount(foundPromotion.get(item.productId()))
                                                                                .price(item.unitPrice())
                                                                                .build())
                                                  .toList();

        Integer total = newOrderDetail.stream().mapToInt(xx -> {
            if (xx.getDiscount()==null)
                return xx.getQuantity()*xx.getPrice();
                else return (xx.getQuantity()*xx.getPrice()*xx.getDiscount()/100);
        }).sum();
        OrderEntity newOrder = orderRepository.save(orderMapper.toEntity(order, EOrderStatus.PENDING, LocalDateTime.now(), total));
        orderDetailRepository.saveAll(newOrderDetail.stream().map(od -> od.updateOrderId(newOrder.getOrderId())).toList());
        cartItemRepository.deleteAllByUserId(order.customerId());
    }

    public OrderResponse getOrderById(Integer orderId) {
        return orderMapper.toDto(orderRepository.findById(orderId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public List<OrderResponse> getOrderByCustomerId(Integer customerId){
        return orderMapper.toDto(orderRepository.findOrderByCustomerId(customerId));
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
