package com.webtranh.controller.group.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.webtranh.model.enums.ESex;

import java.time.LocalDate;

public record GroupUpdate(
        Integer groupId,
        String groupName
) {}
