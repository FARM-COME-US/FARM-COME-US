package com.ssafy.farmcu.api.dto.member;

import com.ssafy.farmcu.api.entity.member.Member;
import lombok.Getter;

@Getter
public class MemberResponseDto {
    private Long memberId;
    private String id;
    private String nickname;
    private String name;
    private String email;
    private String streetAddr;
    private String detailAddr;
    private String zipcode;
    private String phoneNumber;
    private String profileImg;

    public MemberResponseDto(Member member){
        this.memberId = member.getMemberId();
        this.id = member.getId();
        this.nickname = member.getNickname();
        this.name = member.getName();
        this.email = member.getEmail();
        this.streetAddr = member.getEmail();
        this.detailAddr = member.getDetailAddr();
        this.zipcode = member.getZipcode();
        this.phoneNumber = member.getPhoneNumber();
        this.profileImg = member.getProfileImg();
    }
    public static MemberResponseDto of(Member member) {
        return new MemberResponseDto(member);
    }


}