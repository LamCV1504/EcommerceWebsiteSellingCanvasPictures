package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.product.models.ProductRequest;
import com.webtranh.controller.product.models.ProductResponse;
import com.webtranh.controller.product.models.ProductUpdate;
import com.webtranh.dto.ProductMapper;
import com.webtranh.repository.product.ProductEntity;
import com.webtranh.repository.product.ProductRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    @NonNull
    final ProductRepository productRepository;
    @NonNull final ProductMapper productMapper;

    public void addNewProduct(ProductRequest product) {
        ProductEntity newProduct = productMapper.toEntity(product);
        productRepository.save(productMapper.toEntity(product));
    }

    public ProductResponse getProductById(Integer productId) {
        return productMapper.toDto(productRepository.findById(productId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public void changeProductInfo(Integer productId, ProductUpdate product) {
        ProductEntity foundProduct = productRepository.findById(productId).orElseThrow(ResourceNotFoundException::new);
        productMapper.updateExisted(product, foundProduct);
        productRepository.save(foundProduct);
    }

    public void deleteProduct(Integer productId) {
        productRepository.deleteById(productId);
    }

    public Page<ProductResponse> getProductPaging(PageRequest pageRequest) {
        Page<ProductEntity> foundProduct = productRepository.findAll(pageRequest);
        return new PageImpl<>(productMapper.toDto(foundProduct.getContent()),
                pageRequest,
                foundProduct.getTotalElements());
    }
}
