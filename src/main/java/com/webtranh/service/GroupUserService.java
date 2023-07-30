package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.group_user.models.GroupUserRequest;
import com.webtranh.controller.group_user.models.GroupUserResponse;
import com.webtranh.controller.group_user.models.GroupUserUpdate;
import com.webtranh.dto.GroupUserMapper;
import com.webtranh.repository.group_user.GroupUserEntity;
import com.webtranh.repository.group_user.GroupUserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupUserService {

    @NonNull final GroupUserRepository groupUserRepository;
    @NonNull final GroupUserMapper groupUserMapper;

    public void addNewGroupUser(GroupUserRequest groupUser) {
        GroupUserEntity newGroupUser = groupUserMapper.toEntity(groupUser);
        groupUserRepository.save(groupUserMapper.toEntity(groupUser));
    }

    public void changeInfo(Integer groupUserId, GroupUserUpdate groupUser) {
        GroupUserEntity foundGroupUser = groupUserRepository.findById(groupUserId).orElseThrow(ResourceNotFoundException::new);
        groupUserMapper.updateExisted(groupUser, foundGroupUser);
        groupUserRepository.save(foundGroupUser);
    }

    public void deleteGroupUser(Integer groupUserId) {
        groupUserRepository.deleteById(groupUserId);
    }

    public Page<GroupUserResponse> getGroupUserPaging(PageRequest pageRequest) {
        Page<GroupUserEntity> foundGroupUser = groupUserRepository.findAll(pageRequest);
        return new PageImpl<>(groupUserMapper.toDto(foundGroupUser.getContent()),
                              pageRequest,
                              foundGroupUser.getTotalElements());
    }

    public GroupUserResponse getGroupUserById(Integer groupUserId) {
        return groupUserMapper.toDto(groupUserRepository.findById(groupUserId)
                .orElseThrow(ResourceNotFoundException::new));
    }
}
