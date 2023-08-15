package com.webtranh.repository.user;

import com.webtranh.model.enums.ESex;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    @Enumerated(EnumType.STRING)
    private ESex sex;
    private String address;
    private String email;
    private String phone;
    private String image;
    private String password;
    private String code;
}
