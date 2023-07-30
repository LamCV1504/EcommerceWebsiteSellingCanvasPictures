package com.webtranh.controller.group_user;

import com.webtranh.controller.group_user.models.GroupUserRequest;
import com.webtranh.controller.group_user.models.GroupUserResponse;
import com.webtranh.controller.group_user.models.GroupUserUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/group_users")
@Tag(name = "group_user", description = "Group User API")
public interface GroupUserAPI {

    @GetMapping("/{groupUserId}")
    GroupUserResponse getGroupUserById(@PathVariable Integer groupUserId);

    @GetMapping
    Page<GroupUserResponse> getGroupUserPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void addNewGroupUser(@RequestBody @Valid GroupUserRequest groupUser);

    @PatchMapping("/{groupUserId}")
    void changeGroupUserInfo(@PathVariable Integer groupUserId, @RequestBody @Valid GroupUserUpdate groupUser);

    @DeleteMapping("/{groupUserId}")
    void deleteGroupUser(@PathVariable Integer groupUserId);
}
