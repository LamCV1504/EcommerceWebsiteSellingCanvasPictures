package com.webtranh.controller.group_user;

import com.webtranh.controller.group_user.models.GroupUserRequest;
import com.webtranh.controller.group_user.models.GroupUserResponse;
import com.webtranh.controller.group_user.models.GroupUserUpdate;
import com.webtranh.service.GroupUserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GroupUserController implements GroupUserAPI {

    @NonNull final GroupUserService groupUserService;

    @Override
    public GroupUserResponse getGroupUserById(Integer groupUserId) {
        return groupUserService.getGroupUserById(groupUserId);
    }

    @Override
    public Page<GroupUserResponse> getGroupUserPaging(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return groupUserService.getGroupUserPaging(pageRequest);
    }

    @Override
    public void addNewGroupUser(GroupUserRequest groupUser) {
        groupUserService.addNewGroupUser(groupUser);
    }

    @Override
    public void changeGroupUserInfo(Integer groupUserId, GroupUserUpdate groupUser) {
        groupUserService.changeInfo(groupUserId, groupUser);
    }

    @Override
    public void deleteGroupUser(Integer groupUserId) {
        groupUserService.deleteGroupUser(groupUserId);
    }
}
