package com.ssafy.farmcu.api.controller.order;



import com.ssafy.farmcu.api.dto.order.KaKaoPayDTO;
import com.ssafy.farmcu.api.dto.order.pay.KakaoPayApproveDto;
import com.ssafy.farmcu.api.dto.order.pay.KakaoReqDto;
import com.ssafy.farmcu.api.entity.order.Order;
import com.ssafy.farmcu.api.service.member.MemberService;
import com.ssafy.farmcu.api.service.order.OrderServiceImpl;
import com.ssafy.farmcu.api.service.order.PayService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
@Component
@Slf4j
@RequestMapping("api/v1/pay")
@Api(value = "pay API")
public class KakaoController {

    private final PayService payService;
    private final MemberService memberService;
    private final OrderServiceImpl orderService;
    private final OrderController orderController;

    KakaoController(@Lazy OrderServiceImpl orderService, @Lazy OrderController orderController, @Lazy PayService payService, @Lazy MemberService memberService) {
        this.orderService = orderService;
        this.payService = payService;
        this.memberService = memberService;
        this.orderController = orderController;
    }

    //    @PreAuthorize("isAuthenticated()")
    @GetMapping("/kakaoreq")
    public KakaoReqDto payRequest(@RequestParam Long orderId, Long memberId, int itemCount ){

        Order order = orderService.updateOrder(orderId);
        memberId = memberId;
        KakaoReqDto requestResponse = payService.kakaoPayRequest(order.getTotalPrice(), itemCount, orderId, memberId);

//        redis.redisTemplate().opsForValue().set(String.valueOf(userId), requestResponse.getTid(), 1000 * 60 * 15, TimeUnit.MILLISECONDS);

        return requestResponse;
    }

    @GetMapping("/kakao/success")
    public ResponseEntity payApprove( @RequestParam("pg_token") String pgToken ){

        String tid = "";

        KakaoPayApproveDto kakaoPayApproveDto = payService.kakaoPayApprove(tid, pgToken);

        Long orderId = Long.valueOf(kakaoPayApproveDto.getPartner_order_id());
        log.info("orderId = {}", orderId);
        orderService.completeOrder(orderId);

        return new ResponseEntity<>(kakaoPayApproveDto, HttpStatus.CREATED);
    }


//    // 카카오페이 결제
//    @PostMapping("kakaopay")
//    @ApiOperation(value = "카카오 페이 결제")
//    public String KakaoPay(@RequestBody KaKaoPayDTO kaKaoPayDTO) {
//
//        // kaKaoPayDTO 에 맞춰서 카카오페이 결제 진행
//        String kaKaoPay = payService.KaKaoPay(kaKaoPayDTO);
//
//        return kaKaoPay;
//    }
//
//    // 카카오 페이 결제가 성공적으로 진행됬을 경우
//    @GetMapping("kakao/success")
//    @ApiOperation(value = "카카오 페이 결제 성공")
//    public ResponseEntity KaKaoSuccess(@RequestParam String pg_token) {
//
//        String kakaoaAprove = kakaoService.KakaoAprove(pg_token);
//
//        return ResponseEntity.ok().body(kakaoaAprove);
//    }
//
//    // 카카오 페이 결제가 취소 됬을 경우
//    @GetMapping("kakao/cancel")
//    @ApiOperation(value = "카카오 페이 결제 취소")
//    public String KaKaoCancel() {
//
//        return "카카오 결제 취소";
//    }
//
//
//    // 카카오 페이 결제가 실패 했을 경우
//    @GetMapping("kakao/fail")
//    @ApiOperation(value = "카카오 페이 결제 실패")
//    public String KaKaoFail() {
//
//        return "카카오 결제 실패";
//    }
//
}