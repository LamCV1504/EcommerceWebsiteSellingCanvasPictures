package com.webtranh.repository.cart_item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Integer> {

    @Query("""
        SELECT p, ci.id, ci.quantity, sum(ci.quantity*p.unitPrice), pe.discount FROM CartItemEntity ci
        INNER JOIN ProductEntity p ON ci.productId = p.productId
        INNER JOIN PromotionDetailEntity pd ON pd.categoryId = p.categoryId
        INNER JOIN PromotionEntity pe ON pe.promotionId = pd.promotionId 
        WHERE ci.userId = :userId
        GROUP BY p.productId
    """)
    List<Object[]> findAllByUserId(Integer userId);

    Optional<CartItemEntity> findByUserIdAndProductId(Integer userId, Integer productId);
    void deleteAllByUserId(Integer userId);
}
