package com.webtranh.controller.product;

import com.webtranh.controller.product.models.ProductRequest;
import com.webtranh.controller.product.models.ProductResponse;
import com.webtranh.controller.product.models.ProductUpdate;
import com.webtranh.service.ProductService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

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
        return productService.getProductPaging(pageRequest);
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
