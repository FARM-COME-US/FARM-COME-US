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

    // 카카오 유저 생성
    @Override
    public Member Create(String code) {

        System.out.println("Create() KaKao -> Service -> KaKaoSerImpl p57");
        // 1번 인증코드 요청 전달
        String accessToken = getAccessToken(code);

        // accessToken 의 값이 잘 받아왔는지 체크
        if (accessToken == null) throw new NullPointerException("NO access Token");

        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = getUserInfo(accessToken);

        // userInfo 가 잘받아 왔는지를 체크
        if (userInfo == null) throw new NullPointerException("NO userInfo");

        // 콘솔창에 받아온 userInfo 출력
        System.out.println("userInfo : " + userInfo.toString());

        // userInfo 안에 있는 값들을 형변환을 통해서 저장
        String email = (String) userInfo.get("email");
        String username = (String) userInfo.get("username");

        // 위에서 받아온 데이터를 기반으로 동일한 유저이름이 있는지 DB 내에서 검색
        Optional<Member> getUserCheck = memberRepository.findById(username);

        // 이미 가입되어 있는 회원이면 기존 회원 정보를 리턴
        if (!getUserCheck.isEmpty()) {
            return getUserCheck.get();
        }

        // 카카오 로그인 에서 Email 선택 동의를 체크 안한경우 Guest_KaKao 로 Email 입력;
        if (email == null) {
            email = "Guest_KaKao_" + Integer.toString(count);
            count++;
        }

        String encodePass = passwordEncoder.encode("0000");
        // 유효성 검사 통과하면 유저 객체 안에 저장
        Date now = new Date();
        Member member = Member.builder()
                .email(email)
                .id(username)
                .password(encodePass)
                .build();

        return memberRepository.save(member);
    }

    // 클라이언트에서 인가코드를 받아온뒤 해당 코드를 사용하여 카카오 로부터
    // AccessToken 받아오기
    @Override
    public String getAccessToken(String code) {

        System.out.println("getAccessToken() 진입 KaKao -> Service -> KaKaoSerImpl p110");

        // 카카오 API양식에 맞춰 reqURL, client_id, redirect_uri, 를 변수에 담아놓고 사용하기
        String reqURL = "https://kauth.kakao.com/oauth/token";
//        String redirect_uri = "http://localhost:3000/kakao";
        String redirect_uri = "http://mywinefindbucket.s3-website.ap-northeast-2.amazonaws.com/kakao.html";

        // 스프링에서 제공하는 http 통신에 유용하게 쓸 수 있는 템플릿사용
        // getAccessToken 에 맞춰서 사용
        RestTemplate getAccess = new RestTemplate();

        // 카카오에서 요구하는 양식에 맞춰서 HttpHeader 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // MultiValueMap 을 통하여 카카오에서 요구하는 데이터를 담을 HttpBody 작성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", client_id);
        body.add("redirect_uri", redirect_uri);
        body.add("code", code);

        // 위에서 작성 HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(body, headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getAccess.exchange(reqURL, HttpMethod.POST, tokenRequest, String.class);

        System.out.println("KaKao -> Service -> KaKaoSerImpl p138");

        // 응답받은 데이터들을 파싱하기 위해서 Jackson 라이브러리의 ObjectMapper 사용
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // 응답받은 내용을 OAuthToken 양식에 맞춰서 파싱
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            System.out.println("AccessToken 을 파싱하는대 실패를 하였습니다. 양식을 다시한번 확인해 주세요 " + e);
        }

        // 파싱한 내용이 잘 들어왔는지 콘솔로그로 확인
        System.out.println("카카오 Access_Token :" + oAuthToken.getAccess_token());

        // Access_token 리턴
        return oAuthToken.getAccess_token();
    }

    // 카카오 유저정보 받아오기
    @Override
    public HashMap<String, Object> getUserInfo(String accessToken) {
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqUrl = "https://kapi.kakao.com/v2/user/me";

        System.out.println("getUserInfo() 진입 KaKao -> Service -> KaKaoSerImpl p162");

        // getUserInfo 를 얻기 위한 기본 양식으로 사용
        RestTemplate getUser = new RestTemplate();

        // 카카오 에서 요구하는 양식에 맞춰서 HttpHeader 생성
        // ! 주의 Bearer 앞에 공백으로 한칸 뛰어 놓는거 잊지 않기!
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 위에서 작성한 HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> userRequest = new HttpEntity<>(headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getUser.exchange(reqUrl, HttpMethod.POST, userRequest, String.class);

        // response 된 데이터를 출력
        System.out.println("response get body " + response.getBody());

        // 카카오에서 보내용 유저정보를 파싱하기위해서 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // 혹시라도 딴대 쓸일 있을때 전역으로 관리하기
        KakaoProfile kakaoProfile = null;
        try {
            // kakaoProfile 양식에 맞춰서 데이터들을 파싱
            kakaoProfile = objectMapper.readValue(response.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            System.out.println("userInfo 를 파싱하는대 실패를 하였습니다. 양식을 다시한번 확인해 주세요 " + e);
        }

        // 파싱된 내용을 추출하여 저장
        String email = kakaoProfile.getKakao_account().getEmail();
        String username = kakaoProfile.getProperties().getNickname();

        // 값이 잘 나오는지를 확인
        System.out.println("email : " + email);
        System.out.println("username : " + username);


        // userInfo 에 값을 저장후 리턴
        userInfo.put("email", email);
        userInfo.put("username", username);

        return userInfo;
    }

    @Override
    public String getLogout() {

        String reqUrl = "https://kapi.kakao.com/oauth/token";

        System.out.println("getLogout() 진입 KaKao -> Service -> KaKaoSerImpl p215");

        // getUserInfo 를 얻기 위한 기본 양식으로 사용
        RestTemplate getLogout = new RestTemplate();

        // Access_token 확인
        System.out.println("Access_Token : " + oAuthToken.getAccess_token());
        // 카카오 에서 요구하는 양식에 맞춰서 HttpHeader 생성
        // ! 주의 Bearer 앞에 공백으로 한칸 뛰어 놓는거 잊지 않기!
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oAuthToken.getAccess_token());

        HttpEntity<MultiValueMap<String, String>> logoutRequest = new HttpEntity<>(headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getLogout.exchange(reqUrl, HttpMethod.POST, logoutRequest, String.class);

        System.out.println("로그아웃된 사용자 회원번호는 : " + response.getBody());


        return "카카오 로그아웃이 성공 했습니다.";
    }


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
