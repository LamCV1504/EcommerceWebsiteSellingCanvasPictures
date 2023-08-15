package com.webtranh.repository.promotion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<PromotionEntity, Integer> {

    List<PromotionEntity> findAll();

    @Query("""
        SELECT p.productId, pe.discount FROM PromotionEntity pe
        INNER JOIN PromotionDetailEntity pde ON pe.promotionId = pde.promotionId
        INNER JOIN CategoryEntity ce ON pde.categoryId = ce.categoryId
        INNER JOIN ProductEntity p ON ce.categoryId = p.categoryId
        WHERE :dateNow BETWEEN pe.startDate ANd pe.endDate
        AND p.productId IN :productsId
        GROUP BY p
    """)
    List<Object[]> findByProductId(List<Integer> productsId, LocalDate dateNow);
}
