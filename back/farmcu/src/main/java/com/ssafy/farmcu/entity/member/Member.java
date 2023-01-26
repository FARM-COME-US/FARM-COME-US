package com.ssafy.farmcu.entity.member;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long member_id;

    @Column(length = 20)
    private String id;

    @Column(length = 20)
    private String password;
    @Column(length = 10)
    private String nickname;
    @Column(length = 10)
    private String name;

    @Column(length = 30)
    private String email;

    @Column(name = "profile_img", length=255)
    private String profileImg;
    @Column(name = "street_addr", length=50)
    private String streetAddr;
    @Column(name = "detail_addr", length=50)
    private String detailAddr;

    @Column(length = 10)
    private String zipcode;

    @Column(length = 15)
    private String phoneNumber;

    @Column(name = "access_token", length = 255)
    private String accessToken;


    // 인증
    @Column(length = 20)
    private String role; //ROLE_USER, ROLE_ADMIN
    // OAuth를 위해 구성한 추가 필드 2개
    @Column(length = 20)
    private String provider;

    @Column(name = "provider_id", length = 100)
    private String providerId;

    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;

    @Builder
    public Member(Long member_id, String id, String password, String nickname, String name, String email, String profileImg, String streetAddr, String detailAddr, String zipcode, String phoneNumber, String accessToken, String role, String provider, String providerId, Timestamp createdAt) {
        this.member_id = member_id;
        this.id = id;
        this.password = password;
        this.nickname = nickname;
        this.name = name;
        this.email = email;
        this.profileImg = profileImg;
        this.streetAddr = streetAddr;
        this.detailAddr = detailAddr;
        this.zipcode = zipcode;
        this.phoneNumber = phoneNumber;
        this.accessToken = accessToken;
        this.role = role;
        this.provider = provider;
        this.providerId = providerId;
        this.createdAt = createdAt;
    }
}
