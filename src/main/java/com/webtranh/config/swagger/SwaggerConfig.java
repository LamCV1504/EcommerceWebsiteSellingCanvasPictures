package com.webtranh.config.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
  info = @Info(
    title = "Project",
    version = "1.0.0",
    description = "Backend",
    contact = @Contact(
      name = "Cao Văn Lâm",
      email = "caolam1504@gmail.com"
    )
  )
)
public class SwaggerConfig {
  
}
