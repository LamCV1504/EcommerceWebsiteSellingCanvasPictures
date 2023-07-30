package com.webtranh.config.exception;

public class RequestInvalidException extends RuntimeException {

  public RequestInvalidException(String message) {
    super(message);
  }
  public RequestInvalidException() { super("Không có dữ liệu"); }
}
