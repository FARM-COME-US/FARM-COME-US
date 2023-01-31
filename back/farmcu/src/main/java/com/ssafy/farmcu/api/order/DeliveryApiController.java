package com.ssafy.farmcu.api.order;

import com.ssafy.farmcu.service.member.MemberService;
import com.ssafy.farmcu.service.order.CartService;
import com.ssafy.farmcu.service.order.DeliveryInfoService;
import com.ssafy.farmcu.service.order.OrderService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Api(tags = "배송정보 관련 api")
public class DeliveryApiController {

    private final DeliveryInfoService deliveryInfoService;
    private final OrderService orderService;


}
