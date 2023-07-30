package com.webtranh.config.exception;

public class ResourceNotFoundException extends RuntimeException {
  
  public ResourceNotFoundException(String message) {
    super(message);
  }
  public ResourceNotFoundException() { super("Không có dữ liệu"); }
}
