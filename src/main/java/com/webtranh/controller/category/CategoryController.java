package com.webtranh.controller.category;

import com.webtranh.controller.category.models.CategoryRequest;
import com.webtranh.controller.category.models.CategoryResponse;
import com.webtranh.controller.category.models.CategoryUpdate;
import com.webtranh.service.CategoryService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CategoryController implements CategoryAPI {

    @NonNull final CategoryService categoryService;

    @Override
    public CategoryResponse getCategoryById(Integer categoryId) {
        return categoryService.getCategoryById(categoryId);
    }


    @Override
    public Page<CategoryResponse> getCategoryPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return categoryService.getCategoryPaging(pageRequest);
    }

    @Override
    public void addNewCategory(CategoryRequest category) {
        categoryService.addNewCategory(category);
    }

    @Override
    public void changeCategoryInfo(Integer categoryId, CategoryUpdate category) {
        categoryService.changeCategoryInfo(categoryId, category);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}
