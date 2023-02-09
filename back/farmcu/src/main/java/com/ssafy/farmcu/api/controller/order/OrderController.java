
package com.ssafy.farmcu.api.controller.order;

import com.ssafy.farmcu.api.dto.order.OrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
<<<<<<< HEAD
import com.ssafy.farmcu.api.entity.order.Order;
=======
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e
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

<<<<<<< HEAD
    public final OrderServiceImpl orderService;
    private final CartService cartService;
=======
    //    @Autowired
<<<<<<< HEAD
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

=======
    private final OrderService orderService;
    public final OrderServiceImpl orderServiceImpl;
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e

    OrderController(@Lazy OrderServiceImpl orderService, @Lazy CartService cartService) {
        this.orderService = orderService;
        this.cartService = cartService;
    }

<<<<<<< HEAD
=======
    //** 내 주문 목록 조회 **//
    //**  스토어 관리자가 주문 목록을 조회 하려고 할 때  **//


//    @GetMapping("/myOrders")
//    public String getMyOrders(Model model){
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //현재 로그인 정보
//        List<OrderDetail> orders = orderService.findMyDetails(user); //멤버의 주문목록 불러오기
//
//        model.addAttribute("orders", orders); //멤버의 주문리스트 뷰로 전송
//        return "/order/myOrder";
//    }
//    @GetMapping("/{memberId}")
//    @ApiOperation(value = "주문 목록 조회")
//    public ResponseEntity getMyOrders(Member member){
//        List<OrderItem> orders = orderService.findAll(member); //멤버의 주문목록 불러오기
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    //** 장바구니 주문 **//
    @PostMapping("/{cartId}")
    @ApiOperation(value = "장바구니 상품 주문")
    public ResponseEntity orders(@RequestBody CartOrderDto cartOrderDto, Cart cart) {
//        Order order = orderService.orders(cartOrderDto.getCartId(cart.getCartId()));
//        return Response.success(MessageFormat.CREATE_ORDER_SUCCESS);
        return new ResponseEntity<>(HttpStatus.OK);
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1
    }

    //** 상품 주문 **//                  <======== 장바구니 상품 주문은 CartController
    //** 주문 == 결제하기인데 다시 생각해 봐야 할듯 **//
    // ( 장바구니 / 상품 주문 페이지 ) 구매하기 버튼 클릭 -> 구매 페이지 이동: 배송 번호랑 결제 수단 입력 받고
    // ( 구매 페이지 ) 결제 버튼 클릭 : 간편 결제 -> 카카오 간편 결제 / 계좌 이체 -> 계좌 이체

>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e
    @PostMapping(value = "")
    @ApiOperation(value = "상품 주문")
    public ResponseEntity order(@RequestBody OrderDto orderDto){

        Long orderId; //주문번호 생성

        try {
<<<<<<< HEAD
            orderId = orderService.order(orderDto); //주문 시도 및 주문번호 가져오기

=======
            orderId = orderService.order(orderDto, name); //주문 시도 및 주문번호 가져오기
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }


<<<<<<< HEAD

    @GetMapping("/detail")
    @ApiOperation(value = "주문 상세 조회")
    public ResponseEntity getMyOrders(@RequestHeader Member memberId){

        List<OrderItem> orders = orderService.findOrderDetail(memberId);

=======
   //** 주문 취소 **//
    @PutMapping("/{orderId}")
    @ApiOperation(value = "주문 취소")
    public ResponseEntity updateOrder(@PathVariable Long orderId){
        orderService.updateOrder(orderId);
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e
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
