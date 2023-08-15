package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.category.models.CategoryRequest;
import com.webtranh.controller.category.models.CategoryResponse;
import com.webtranh.controller.category.models.CategoryUpdate;
import com.webtranh.dto.CategoryMapper;
import com.webtranh.repository.category.CategoryEntity;
import com.webtranh.repository.category.CategoryRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @NonNull
    final CategoryRepository categoryRepository;
    @NonNull final CategoryMapper categoryMapper;

    public void addNewCategory(CategoryRequest category) {
        List<CategoryEntity> foundCategory = categoryRepository.findByCategoryName(category.categoryName().trim());
        if (foundCategory.size()>0) {
            throw new ResourceNotFoundException("Tên bộ sưu tập đã tồn tại");
        }
        categoryRepository.save(categoryMapper.toEntity(category));
    }

    public CategoryResponse getCategoryById(Integer categoryId) {
        return categoryMapper.toDto(categoryRepository.findById(categoryId)
                .orElseThrow(ResourceNotFoundException::new));
    }

    public void changeCategoryInfo(Integer categoryId, CategoryUpdate category) {
        CategoryEntity foundCategory = categoryRepository.findById(categoryId).orElseThrow(ResourceNotFoundException::new);
        categoryMapper.updateExisted(category, foundCategory);
        categoryRepository.save(foundCategory);
    }

    public void deleteCategory(Integer categoryId) {
        categoryRepository.deleteById(categoryId);
    }

      public Page<CategoryResponse> getCategoryPaging(PageRequest pageRequest) {
        Page<CategoryEntity> foundCategory = categoryRepository.findAll(pageRequest);
        return new PageImpl<>(categoryMapper.toDto(foundCategory.getContent()),
                pageRequest,
                foundCategory.getTotalElements());
    }
}
