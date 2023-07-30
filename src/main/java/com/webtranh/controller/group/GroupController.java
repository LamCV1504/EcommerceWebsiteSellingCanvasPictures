package com.webtranh.controller.group;

import com.webtranh.controller.group.models.GroupRequest;
import com.webtranh.controller.group.models.GroupResponse;
import com.webtranh.controller.group.models.GroupUpdate;
import com.webtranh.service.GroupService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GroupController implements GroupAPI {

    @NonNull final GroupService groupService;

    @Override
    public GroupResponse getGroupById(Integer groupId) {
        return groupService.getGroupById(groupId);
    }

    @Override
    public Page<GroupResponse> getGroupPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return groupService.getGroupPaging(pageRequest);
    }

    @Override
    public void register(GroupRequest group) {
        groupService.register(group);
    }

    @Override
    public void changeInfo(Integer groupId, GroupUpdate group) {
        groupService.changeInfo(groupId, group);
    }

    @Override
    public void deleteGroup(Integer groupId) {
        groupService.deleteGroup(groupId);
    }
}
