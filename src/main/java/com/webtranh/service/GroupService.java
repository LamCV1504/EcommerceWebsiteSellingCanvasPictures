package com.webtranh.service;

import com.webtranh.config.exception.ResourceNotFoundException;
import com.webtranh.controller.group.models.GroupRequest;
import com.webtranh.controller.group.models.GroupResponse;
import com.webtranh.controller.group.models.GroupUpdate;
import com.webtranh.dto.GroupMapper;
import com.webtranh.repository.group.GroupEntity;
import com.webtranh.repository.group.GroupRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupService {

    @NonNull final GroupRepository groupRepository;
    @NonNull final GroupMapper groupMapper;
    
    public void register(GroupRequest group) {
        GroupEntity newGroup = groupMapper.toEntity(group);
        groupRepository.save(groupMapper.toEntity(group));
    }

    public GroupResponse getGroupById(Integer groupId) {
        return groupMapper.toDto(groupRepository.findById(groupId)
                        .orElseThrow(ResourceNotFoundException::new));
    }

    public void changeInfo(Integer groupId, GroupUpdate group) {
        GroupEntity foundGroup = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        groupMapper.updateExisted(group, foundGroup);
        groupRepository.save(foundGroup);
    }

    public void deleteGroup(Integer groupId) {
        groupRepository.deleteById(groupId);
    }

    public Page<GroupResponse> getGroupPaging(PageRequest pageRequest) {
        Page<GroupEntity> foundGroup = groupRepository.findAll(pageRequest);
        return new PageImpl<>(groupMapper.toDto(foundGroup.getContent()),
                              pageRequest,
                              foundGroup.getTotalElements());
    }
}
