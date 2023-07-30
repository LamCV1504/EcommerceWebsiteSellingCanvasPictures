package com.webtranh.dto;

import com.webtranh.controller.user.models.UserRequest;
import com.webtranh.controller.user.models.UserResponse;
import com.webtranh.controller.user.models.UserUpdate;
import com.webtranh.repository.user.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity toEntity(UserRequest dto);
    UserResponse toDto(UserEntity entity);
    List<UserResponse> toDto(List<UserEntity> entity);
    void updateExisted(UserUpdate dto, @MappingTarget UserEntity entity);
}
