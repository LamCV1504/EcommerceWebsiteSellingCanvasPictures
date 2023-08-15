package com.webtranh.repository.order;

import com.webtranh.model.enums.EOrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;
    private Integer customerId;
    private LocalDateTime purchaseTime;
    @Enumerated(EnumType.STRING)
    private EOrderStatus orderStatus;
    private String shippingAddress;
    private String consigneeName;
    private String consigneePhone;
    private Integer employeeId;
    private String notes;
    private Double total;
}



