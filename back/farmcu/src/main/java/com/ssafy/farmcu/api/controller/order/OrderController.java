
package com.ssafy.farmcu.api.controller.order;

import com.ssafy.farmcu.api.dto.order.OrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.OrderItem;
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

    //    @Autowired
//    private final OrderService orderService;
    public final OrderServiceImpl orderService;

    OrderController(@Lazy OrderServiceImpl orderService) {
        this.orderService = orderService;
    }

    //** 전체 주문 목록 조회 **//
    @GetMapping("/{memberId}")
    @ApiOperation(value = "주문 목록 조회")
    public ResponseEntity getMyOrders(Member member){
//        List<OrderItem> orders = orderService.findAll(member); //멤버의 주문목록 불러오기

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //** 상품 주문 **//                  <======== 장바구니 상품 주문은 CartController
    //** 주문 == 결제하기인데 다시 생각해 봐야 할듯 **//
    // ( 장바구니 / 상품 주문 페이지 ) 구매하기 버튼 클릭 -> 구매 페이지 이동: 배송 번호랑 결제 수단 입력 받고
    // ( 구매 페이지 ) 결제 버튼 클릭 : 간편 결제 -> 카카오 간편 결제 / 계좌 이체 -> 계좌 이체

    @PostMapping(value = "")
    @ApiOperation(value = "상품 주문")
    public ResponseEntity order(OrderDto orderDto, BindingResult bindingResult, Principal principal){
        if(bindingResult.hasErrors()){
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors){
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }

        String name = principal.getName(); //현재 로그인 정보에서 이름 가져오기
        Long orderId; //주문번호 생성

        try {
            orderId = orderService.order(orderDto, name); //주문 시도 및 주문번호 가져오기
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    //** 주문 취소 **//
    @PutMapping("/{orderId}")
    @ApiOperation(value = "주문 취소")
    public ResponseEntity updateOrder(@PathVariable Long orderId){
        orderService.updateOrder(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
