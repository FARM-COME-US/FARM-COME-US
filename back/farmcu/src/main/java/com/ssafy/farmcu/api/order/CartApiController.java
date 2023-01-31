package com.ssafy.farmcu.api.order;

import com.ssafy.farmcu.service.member.MemberService;
import com.ssafy.farmcu.service.order.CartService;
import com.ssafy.farmcu.service.order.OrderService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Api(tags = "장바구니관련 api")
public class CartApiController {

    private final CartService cartService;
    private final OrderService orderService;
    private final MemberService memberService;

}
