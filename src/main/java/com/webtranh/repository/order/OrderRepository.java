package com.webtranh.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
//    List<OrderEntity> findOrderByStatus(String Status);
    List<OrderEntity> findOrderByCustomerId(Integer customerId);
}
