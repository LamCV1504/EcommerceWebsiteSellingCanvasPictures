package com.webtranh.controller.category;

import com.webtranh.controller.category.models.CategoryRequest;
import com.webtranh.controller.category.models.CategoryResponse;
import com.webtranh.controller.category.models.CategoryUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/categories")
@Tag(name = "category", description = "Category API")
public interface CategoryAPI {

    @GetMapping("/{categoryId}")
    CategoryResponse getCategoryById(@PathVariable Integer categoryId);

    @GetMapping
    Page<CategoryResponse> getCategoryPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewCategory(@RequestBody @Valid CategoryRequest category);

    @PatchMapping("/{categoryId}")
    void changeCategoryInfo(@PathVariable Integer categoryId, @RequestBody @Valid CategoryUpdate category);

    @DeleteMapping("/{categoryId}")
    void deleteCategory(@PathVariable Integer categoryId);
}
