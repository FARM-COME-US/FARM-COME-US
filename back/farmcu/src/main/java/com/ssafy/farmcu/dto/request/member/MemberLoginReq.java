package com.ssafy.farmcu.dto.request.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginReq {
    String id;
    String password;
}
