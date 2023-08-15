package com.webtranh.repository.product;

import com.webtranh.model.enums.EStatus;
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
@Table(name = "product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;
    private String productName;
    private String productDescription;
    private String image;
    @Enumerated(EnumType.STRING)
    private EStatus productStatus;
    private Integer unitPrice;
    private Integer quantity;
    private Integer categoryId;
}
