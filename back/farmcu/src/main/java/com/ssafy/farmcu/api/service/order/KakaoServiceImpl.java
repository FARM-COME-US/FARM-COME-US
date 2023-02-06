package com.ssafy.farmcu.api.service.order;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.farmcu.api.dto.order.KaKaoPayDTO;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.pay.*;
import com.ssafy.farmcu.api.repository.KaKaoPayRepository;
import com.ssafy.farmcu.api.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

@Service
@Transactional
@Component
public class KakaoServiceImpl implements KakaoService {

    private final MemberRepository memberRepository;
    private final KaKaoPayRepository kaKaoPayRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String cid = "TC0ONETIME";

    private KaKaoPayment kaKaoPayment;
    private OAuthToken oAuthToken;
    private KaKaoPay kaKaoPay;


    public KakaoServiceImpl(MemberRepository memberRepository, KaKaoPayRepository kaKaoPayRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.kaKaoPayRepository = kaKaoPayRepository;
        this.passwordEncoder = passwordEncoder;
    }

//    @Value("${KaKao.client_id}")
    private String client_id;
//    @Value("${KaKao.admin_id}")
    private String admin;
//    @Value("${config.domain}")
    private String domain;

    private int count = 0001;


    // 카카오 페이
    @Override
    public String KaKaoPay(KaKaoPayDTO kaKaoPayDTO) {

        String reqUrl = "https://kapi.kakao.com/v1/payment/ready";

        System.out.println("KaKaoPay() 진입 KaKao -> Service -> KaKaoSerImpl p243");

        // kaKaoPayDTO 형식에 맞춰서 정보 저장
        // 추후 KakaoAprove 에서도 동일한 partner_user_id, partner_order_id 가 필요하므로 전역에서 관리
        kaKaoPay = KaKaoPay.builder()
                .cid(cid)
                .partner_user_id(kaKaoPayDTO.getMemberId())
                .partner_order_id(kaKaoPayDTO.getOrderId())
                .item_name(kaKaoPayDTO.getItemName())
                .quantity(kaKaoPayDTO.getQuantity())
                .total_amount(kaKaoPayDTO.getTotalAmount())
                .tax_free_amount(kaKaoPayDTO.getTax())
                .build();

        // DB에 카카오 정보 저장
        kaKaoPayRepository.save(kaKaoPay);

        // kaKaoPay 에 값이 잘 담겼는지 확인
        System.out.println("-> KaKao -> Service -> KaKaoSerImpl p260" + kaKaoPay.getPartner_order_id());

        // 카카오에 보내기위한 카카오페이 양식 만들기
        RestTemplate kakaoPayTemplate = new RestTemplate();

        // 카카오 문서에 맞게 Header 부분 작성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + admin);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 카카오 문서에 맞게 body 부분 작성
        MultiValueMap<String, String> bodys = new LinkedMultiValueMap<>();
        bodys.add("cid", kaKaoPay.getCid());
        bodys.add("partner_order_id", kaKaoPay.getPartner_order_id());
        bodys.add("partner_user_id", kaKaoPay.getPartner_user_id());
        bodys.add("item_name", kaKaoPay.getItem_name());
        bodys.add("quantity", kaKaoPay.getQuantity());
        bodys.add("total_amount", kaKaoPay.getTotal_amount());
        bodys.add("tax_free_amount", kaKaoPay.getTax_free_amount());
        bodys.add("approval_url", domain+"/success.html");
//        bodys.add("approval_url", domain + "/success");

        bodys.add("cancel_url", domain + "/kakao/cancel");
        bodys.add("fail_url", domain + "/kakao/fail");


        // Header 와 body를 함께 담기
        HttpEntity<MultiValueMap<String, String>> paymentRequest = new HttpEntity<>(bodys, headers);

        // reqUrl 로 매소드는 POST로 paymentRequest전송 응답은 String으로
        ResponseEntity<String> response = kakaoPayTemplate.exchange(reqUrl, HttpMethod.POST, paymentRequest, String.class);

        System.out.println("KaKao Pay response : " + response.getBody());

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            System.out.println("카카오 페이========================================================");
            kaKaoPayment = objectMapper.readValue(response.getBody(), KaKaoPayment.class);
            System.out.println("kaKaoPayment PC : " + kaKaoPayment.getNext_redirect_pc_url());
            return kaKaoPayment.getNext_redirect_pc_url();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return "카카오 페이 결제가 실패 하였습니다.";
    }

    // 카카오 페이 영수증
    @Override
    public String KakaoAprove(String pg_token) {

        String reqUrl = "https://kapi.kakao.com/v1/payment/approve";

        System.out.println("KakaoAprove() 진입 KaKao -> Service -> KaKaoSerImpl p314");
        System.out.println("pg_token : " + pg_token);

        // 카카오에 보낼 형식에 맞춰 pg_token 과 필수 데이터를 저장
        KakaoApprove kakaoApprove = KakaoApprove.builder()
                .cid(cid)
                .tid(kaKaoPayment.getTid())
                .partner_order_id(kaKaoPay.getPartner_order_id())
                .partner_user_id(kaKaoPay.getPartner_user_id())
                .build();

        // 카카오 보낼 기본 RestTemplate 생성
        RestTemplate kakaoaAproveTempl = new RestTemplate();


        // 카카오 API 양식에 맞춰 Header 작성
        // !주의 KakaoAK 앞에 스페이스 한칸 띄워쓰기!
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + admin);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 카카오 API 양식에 맞춰 body 작성
        MultiValueMap<String, String> kakaoAproveBody = new LinkedMultiValueMap<>();

        kakaoAproveBody.add("cid", kakaoApprove.getCid());
        kakaoAproveBody.add("tid", kakaoApprove.getTid());
        kakaoAproveBody.add("partner_order_id", kakaoApprove.getPartner_order_id());
        kakaoAproveBody.add("partner_user_id", kakaoApprove.getPartner_user_id());
        kakaoAproveBody.add("pg_token", pg_token);

        // Header 와 body 작성
        HttpEntity<MultiValueMap<String, String>> kakaoaAproveReq = new HttpEntity<>(kakaoAproveBody, headers);

        // 위에서 작성한 RestTemplate로 데이터 보내고 받기
        ResponseEntity<String> response = kakaoaAproveTempl.exchange(reqUrl, HttpMethod.POST, kakaoaAproveReq, String.class);

        System.out.println("response.getBody() = " + response.getBody());

        // 응답받은 데이터 리턴
        return response.getBody();
    }
}
