package com.webtranh.controller.auth;

import com.webtranh.controller.auth.models.FormLogin;
import com.webtranh.controller.auth.models.TokenResponse;
import com.webtranh.service.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController implements AuthAPI {

    @NonNull final UserService userService;

    @Override
    public TokenResponse login(FormLogin formLogin) {
        return userService.login(formLogin);
    }
}
