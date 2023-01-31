package com.ssafy.farmcu.api.order;

import com.ssafy.farmcu.service.member.MemberService;
import com.ssafy.farmcu.service.order.CartService;
import com.ssafy.farmcu.service.order.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Api(tags = "주문 관련 api")
public class OrderApiController {

    private final CartService cartService;
    private final OrderService orderService;
    private final MemberService memberService;

//    //** 장바구니 추가 **//
//    @PostMapping
//    @ApiOperation(value = "장바구니를 추가합니다", notes = "장바구니에 상품이 추가되지 않을 경우 404error")
//    public ResponseEntity createCart() {
//
//    }
//
//


}
