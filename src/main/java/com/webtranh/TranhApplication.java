package com.webtranh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class TranhApplication {

	public static void main(String[] args) {
		SpringApplication.run(TranhApplication.class, args);

		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

}
