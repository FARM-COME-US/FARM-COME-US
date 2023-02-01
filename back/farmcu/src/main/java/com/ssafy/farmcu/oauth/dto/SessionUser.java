package com.ssafy.farmcu.oauth.dto;

import com.ssafy.farmcu.entity.member.Member;
import lombok.Getter;

@Getter
public class SessionUser {
    private final String name;
    private final String email;
    private final String id;

    public SessionUser(Member member) {
        this.name = member.getName();
        this.email = member.getEmail();
        this.id = member.getId();
    }
}

