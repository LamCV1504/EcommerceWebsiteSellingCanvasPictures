package com.webtranh.dto;

import com.webtranh.controller.group_user.models.GroupUserRequest;
import com.webtranh.controller.group_user.models.GroupUserResponse;
import com.webtranh.controller.group_user.models.GroupUserUpdate;
import com.webtranh.controller.user.models.UserResponse;
import com.webtranh.controller.user.models.UserUpdate;
import com.webtranh.repository.group_user.GroupUserEntity;
import com.webtranh.repository.user.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupUserMapper {

    GroupUserEntity toEntity(GroupUserRequest dto);
    GroupUserResponse toDto(GroupUserEntity entity);
    List<GroupUserResponse> toDto(List<GroupUserEntity> entity);
    void updateExisted(GroupUserUpdate dto, @MappingTarget GroupUserEntity entity);
}
