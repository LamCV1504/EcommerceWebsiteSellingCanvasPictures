package com.webtranh.repository.order_detail;

import com.webtranh.controller.order_detail.models.ProductOrderDetailResponse;
import com.webtranh.repository.order.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer> {
    @Query("""
        SELECT od, p.productName FROM ProductEntity p 
        INNER JOIN OrderDetailEntity od ON p.productId = od.productId
        WHERE od.orderId = :orderId
    """)
    List<Object[]> findOrderDetailByOrderId(Integer orderId);
}
