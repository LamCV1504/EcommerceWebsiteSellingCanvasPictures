package com.webtranh.controller.product;

import com.webtranh.controller.product.models.*;
import com.webtranh.repository.product.ProductEntity;
import com.webtranh.service.ProductService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController implements ProductAPI {

    @NonNull final ProductService productService;

    @Override
    public ProductResponse getProductById(Integer productId) {
        return productService.getProductById(productId);
    }

    @Override
    public Page<ProductResponse> getProductPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return null; //productService.getProductPaging(pageRequest);
    }

    public List<ProductCategory> getProductsWithCategory(){
        return productService.getProductsWithCategory();
    }
    @Override
    public void addNewProduct(ProductRequest product) {

        productService.addNewProduct(product);
    }

    @Override
    public void changeProductInfo(Integer productId, ProductUpdate product) {
        productService.changeProductInfo(productId, product);
    }

    @Override
    public void deleteProduct(Integer productId) {
        productService.deleteProduct(productId);
    }
}
