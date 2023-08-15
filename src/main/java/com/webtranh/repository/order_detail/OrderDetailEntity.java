package com.webtranh.repository.order_detail;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_detail")
public class OrderDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer orderId;
    private Integer productId;
    private Integer price;
    private Integer quantity;
    private Integer discount;

    public OrderDetailEntity updateOrderId(Integer orderId) {
        return OrderDetailEntity.builder()
                .orderId(orderId)
                .productId(productId)
                .price(price)
                .quantity(quantity)
                .discount(discount)
                .build();
    }
}
