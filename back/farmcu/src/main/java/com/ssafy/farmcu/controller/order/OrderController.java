package com.ssafy.farmcu.controller.order;

import com.ssafy.farmcu.dto.order.OrderDto;
import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.order.OrderItem;
import com.ssafy.farmcu.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private final OrderService orderService;

    //return "/경로"; = html 문서 경로
    //ruturn "redirect: /값"; = 맵핑 액션 이름

    //(관리자)전체 주문 목록
//    @GetMapping("/orders")
//    public String getOrders(Model model){
//        List<OrderDetailInfo> orders = orderService.findAllDetails();
//
//        model.addAttribute("orders", orders);
//        return "/admin/orderList";
//    }

    //** 주문 목록 조회 **//
    @GetMapping("") //전체 주문 목록 확인
    public String selectOrders(Model model){
        List<OrderItem> orders = orderService.findAllItems(); //모든 주문 불러오기

        model.addAttribute("orders", orders); //주문 리스트를 뷰로 전송
        return "/admin/orderList";
    }

    //** 주문 상세 조회 **//
    @GetMapping("")
    public String selectMyOrders(Model model){
        Member member = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //현재 로그인 정보
        List<OrderItem> orders = orderService.findMyItems(member); //멤버의 주문목록 불러오기

        model.addAttribute("orders", orders); //멤버의 주문리스트 뷰로 전송
        return "/order/myOrder";
    }

    //** 주문 **//
    @PostMapping(value = "")
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
    @PutMapping
    public String updateOrder(Long orderId){
        orderService.updateOrder(orderId);

        return "redirect:/myOrders";
    }
}
// 환불 하려면 주문 취소 필요 ? 주문 상태를 환불로 바꾸기 ?
//
