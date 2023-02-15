package com.ssafy.farmcu.api.dto.order.pay;

import lombok.Getter;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Getter
public class KakaoReqDto {

    private String tid = "TC0ONETIME";
    private String next_redirect_pc_url;
    private ZonedDateTime create_at = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

}
