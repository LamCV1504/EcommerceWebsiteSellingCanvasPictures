package com.webtranh.controller.product;

import com.webtranh.controller.product.models.ProductRequest;
import com.webtranh.controller.product.models.ProductResponse;
import com.webtranh.controller.product.models.ProductUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/products")
@Tag(name = "product", description = "Product API")
public interface ProductAPI {

    @GetMapping("/{productId}")
    ProductResponse getProductById(@PathVariable Integer productId);

    @GetMapping
    Page<ProductResponse> getProductPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewProduct(@RequestBody @Valid ProductRequest product);

    @PatchMapping("/{productId}")
    void changeProductInfo(@PathVariable Integer productId, @RequestBody @Valid ProductUpdate product);

    @DeleteMapping("/{productId}")
    void deleteProduct(@PathVariable Integer productId);
}
