package com.webtranh.repository.product;

import com.webtranh.controller.product.models.ProductCategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {

    @Query("""
        SELECT p, c.categoryName, c.author, c.categoryDescription, pe.discount FROM ProductEntity p 
        INNER JOIN CategoryEntity c ON p.categoryId = c.categoryId
        LEFT JOIN PromotionDetailEntity pd ON p.categoryId = pd.categoryId
        LEFT JOIN PromotionEntity pe ON pe.promotionId = pd.promotionId
    """)
    List<Object[]> getProductsWithCategory();

//    @Query("""
//        SELECT p, c.categoryName,c.author, c.categoryDescription,  FROM ProductEnity p
//        INNER JOIN CategoryEntity c ON categoryId = c.categoryId
//        INNER JOIN
//"""
//    )

}
