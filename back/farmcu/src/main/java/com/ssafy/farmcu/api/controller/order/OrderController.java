
package com.ssafy.farmcu.api.controller.order;

import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.dto.order.OrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Order;
import com.ssafy.farmcu.api.entity.order.OrderItem;
import com.ssafy.farmcu.api.service.order.CartService;
import com.ssafy.farmcu.api.service.order.OrderServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/order")
@Component
@Api(value = "주문 관련 API")
public class OrderController {

    public final OrderServiceImpl orderService;
    private final CartService cartService;

    OrderController(@Lazy OrderServiceImpl orderService, @Lazy CartService cartService) {
        this.orderService = orderService;
        this.cartService = cartService;
    }

    @PostMapping(value = "")
    @ApiOperation(value = "상품 주문")
    public ResponseEntity order(@RequestBody OrderDto orderDto){

        Long orderId; //주문번호 생성

        try {
            orderId = orderService.order(orderDto); //주문 시도 및 주문번호 가져오기

        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }



    @GetMapping("/detail")
    @ApiOperation(value = "주문 상세 조회")
    public ResponseEntity getMyOrders(@RequestHeader Member memberId){

        List<OrderItem> orders = orderService.findOrderDetail(memberId);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/")
    @ApiOperation(value = "주문 목록 조회")
    public ResponseEntity getOrders(@RequestHeader Member memberId){

        List<Order> orders = orderService.findMyOrders(memberId);

        return new ResponseEntity<>(HttpStatus.OK);

    }


    @PutMapping("/{orderId}")
    @ApiOperation(value = "주문 취소")
    public ResponseEntity updateOrder(@PathVariable Long orderId){
        orderService.updateOrder(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
