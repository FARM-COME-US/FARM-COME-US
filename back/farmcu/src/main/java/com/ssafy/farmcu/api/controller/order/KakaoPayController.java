package com.ssafy.farmcu.api.controller.order;



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

@RestController
@Component
@Slf4j
@RequestMapping("api/v1/pay")
@Api(value = "pay API")
public class KakaoPayController {

    private final PayService payService;
    private final MemberService memberService;
    private final OrderServiceImpl orderService;
    private final OrderController orderController;
    private Long memberId;

    KakaoPayController(@Lazy OrderServiceImpl orderService, @Lazy OrderController orderController, @Lazy PayService payService, @Lazy MemberService memberService) {
        this.orderService = orderService;
        this.payService = payService;
        this.memberService = memberService;
        this.orderController = orderController;

    }

    //    @PreAuthorize("isAuthenticated()")
    @GetMapping("/kakaoreq")
    public KakaoReqDto payRequest(@RequestParam Long orderId, Long memberId, int itemCount ){

        Order order = orderService.updateOrderForPay(orderId);
        memberId = memberId;
        KakaoReqDto requestResponse = payService.kakaoPayRequest(order.getTotalPrice(), itemCount, orderId, memberId);
        return requestResponse;
    }


    // 이거 시점을 ... 언제로 할지 생각하고
    @PutMapping("/tid")
    @ApiOperation(value = "tid 생성")
    public ResponseEntity updateTid(@RequestParam String tid, Long orderId){
        orderService.tidtid(tid);
        orderService.threadLocal_1();
        try {
            Order order = orderService.updateTid(orderId, tid);
        }
        catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<String>("tid 생성 완료", HttpStatus.OK);
    }

    // 이거 시점이 위에것 보다 뒤로가게
    @GetMapping("/kakao/success")
    public ResponseEntity payApprove( @RequestParam("pg_token") String pgToken ){

//        String tid = orderService.threadLocal_1();
//        System.out.println("@@@@@@@@@@@@@@@@@@@@@" + tid);
//        String tid = String.valueOf(kakaoPayApproveDto.getTid());
//        log.info();
        KakaoPayApproveDto kakaoPayApproveDto = payService.kakaoPayApprove(pgToken);

        Long orderId = Long.valueOf(kakaoPayApproveDto.getPartner_order_id());
        log.info("orderId = {}", orderId);
        orderService.completeOrder(orderId);

        return new ResponseEntity<>(kakaoPayApproveDto, HttpStatus.CREATED);
    }



}