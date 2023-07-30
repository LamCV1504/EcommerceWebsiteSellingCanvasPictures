package com.webtranh.config.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException() {
        super("Hết phiên truy cập, vui lòng đăng nhập lại !!");
    }
}
