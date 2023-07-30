package com.webtranh.repository.promotion_detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionDetailRepository extends JpaRepository<PromotionDetailEntity, Integer> {

    List<PromotionDetailEntity> findAll();
}
