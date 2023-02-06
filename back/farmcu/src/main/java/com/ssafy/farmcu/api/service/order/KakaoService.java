package com.ssafy.farmcu.api.service.order;




import com.ssafy.farmcu.api.dto.order.KaKaoPayDTO;
import com.ssafy.farmcu.api.entity.member.Member;

import java.util.HashMap;

public interface KakaoService {



    public String KaKaoPay(KaKaoPayDTO kaKaoPayDTO);

    public String KakaoAprove(String pg_token);
}