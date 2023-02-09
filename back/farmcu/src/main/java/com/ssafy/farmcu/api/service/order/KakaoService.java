package com.ssafy.farmcu.api.service.order;




import com.ssafy.farmcu.api.dto.order.KaKaoPayDTO;
import com.ssafy.farmcu.api.entity.member.Member;

import java.util.HashMap;

public interface KakaoService {

    public Member Create(String code);

    public Object getAccessToken(String code);

    public HashMap<String, Object> getUserInfo(String accessToken);

    public String getLogout();

    public String KaKaoPay(KaKaoPayDTO kaKaoPayDTO);

    public String KakaoAprove(String pg_token);
}
