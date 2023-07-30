package com.webtranh.dto;

import com.webtranh.controller.group.models.GroupRequest;
import com.webtranh.controller.group.models.GroupResponse;
import com.webtranh.controller.group.models.GroupUpdate;
import com.webtranh.repository.group.GroupEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupMapper {

    GroupEntity toEntity(GroupRequest dto);
    GroupResponse toDto(GroupEntity entity);
    List<GroupResponse> toDto(List<GroupEntity> entity);
    void updateExisted(GroupUpdate dto, @MappingTarget GroupEntity entity);
}
