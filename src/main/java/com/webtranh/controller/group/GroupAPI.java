package com.webtranh.controller.group;

import com.webtranh.controller.group.models.GroupRequest;
import com.webtranh.controller.group.models.GroupResponse;
import com.webtranh.controller.group.models.GroupUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/groups")
@Tag(name = "group", description = "Group API")
public interface GroupAPI {

    @GetMapping("/{groupId}")
    GroupResponse getGroupById(@PathVariable Integer groupId);

    @GetMapping
    Page<GroupResponse> getGroupPaging(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "10") Integer size);

    @PostMapping
    void register(@RequestBody @Valid GroupRequest group);

    @PatchMapping("/{groupId}")
    void changeInfo(@PathVariable Integer groupId, @RequestBody @Valid GroupUpdate group);

    @DeleteMapping("/{groupId}")
    void deleteGroup(@PathVariable Integer groupId);
}
