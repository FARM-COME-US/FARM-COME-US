package com.ssafy.farmcu.api.controller.order;



import com.ssafy.farmcu.api.dto.order.KaKaoPayDTO;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.member.MemberRefreshToken;
import com.ssafy.farmcu.api.service.member.MemberService;
import com.ssafy.farmcu.api.service.order.CartService;
import com.ssafy.farmcu.api.service.order.CartServiceImpl;
import com.ssafy.farmcu.api.service.order.KakaoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.NoSuchElementException;

@RestController
@Component
@Api(value = "pay API")
public class KakaoController {

    //오류
//    private final KakaoService kakaoService;
//    private final MemberService memberService;
//
//    @Autowired
//    public KakaoController(KakaoService kakaoService, MemberService memberService) {
//        this.kakaoService = kakaoService;
//        this.memberService = memberService;
//    }

    private final KakaoService kakaoService;
    private final MemberService memberService;

    KakaoController(@Lazy KakaoService kakaoService, @Lazy MemberService memberService) {
        this.kakaoService = kakaoService;
        this.memberService = memberService;
    }


    // 카카오페이 결제
    @PostMapping("kakaopay")
    @ApiOperation(value = "카카옿 페이 결제")
    public String KakaoPay(@RequestBody KaKaoPayDTO kaKaoPayDTO) {

        // kaKaoPayDTO 에 맞춰서 카카오페이 결제 진행
        String kaKaoPay = kakaoService.KaKaoPay(kaKaoPayDTO);

        return kaKaoPay;
    }

    // 카카오 페이 결제가 성공적으로 진행됬을 경우
    @GetMapping("kakao/success")
    @ApiOperation(value = "카카오 페이 결제 성공")
    public ResponseEntity KaKaoSuccess(@RequestParam String pg_token) {

        String kakaoaAprove = kakaoService.KakaoAprove(pg_token);

        return ResponseEntity.ok().body(kakaoaAprove);
    }

    // 카카오 페이 결제가 취소 됬을 경우
    @GetMapping("kakao/cancel")
    @ApiOperation(value = "카카오 페이 결제 취소")
    public String KaKaoCancel() {

        return "카카오 결제 취소";
    }


    // 카카오 페이 결제가 실패 했을 경우
    @GetMapping("kakao/fail")
    @ApiOperation(value = "카카오 페이 결제 실패")
    public String KaKaoFail() {

        return "카카오 결제 실패";
    }

}