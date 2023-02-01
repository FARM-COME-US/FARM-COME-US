package com.ssafy.farmcu.controller.order;


import com.ssafy.farmcu.dto.order.CartOrderDto;
import com.ssafy.farmcu.dto.order.CartRequestDto;
import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.order.Cart;
import com.ssafy.farmcu.service.order.CartServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private final CartServiceImpl cartServiceImpl;

    // Controller method
    //
    //- create ex) createItem
    //- select ex) selectMember (조회)
    //- 7update ex) updateMemberInfo (업데이트)
    //- Delete ex) deleteMember (삭제)


    //** 로그인 한 사용자의 장바구니 목록 조회 **//
    @GetMapping("")
    @ApiOperation(value="회원 탈퇴", notes="")
    public String selectMyCart(Model model) {
        Member member = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //현재 로그인 정보
        List<Cart> cart = cartServiceImpl.findMyCart(member); //멤버의 주문목록 불러오기
        model.addAttribute("cart", cart); //멤버의 주문리스트 뷰로 전송

        model.addAttribute("cart", cart); //멤버의 주문리스트 뷰로 전송
        return "/member/myCart";
    }


    @PostMapping(value = "") //주문하기,
    public ResponseEntity createCart(CartRequestDto cartDto, BindingResult bindingResult, Principal principal) {
        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }

        String name = principal.getName(); //현재 로그인 정보에서 이름 가져오기
        Long cartId; //장바구니번호 생성

        try {
            cartId = cartServiceImpl.addCart(cartDto, name); //주문 시도 및 주문번호 가져오기
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(cartId, HttpStatus.OK); //장바구니번호 리턴
    }

    //** 장바구니 상품 주문 **//                  <======== 상품 바로 주문은 OrderController
    @PostMapping(value = "")
    public ResponseEntity cartOrder(CartOrderDto cartOrderDto, Principal principal) {
        List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList(); //전달된 장바구니의 항목 리스트

        if (cartOrderDtoList == null || cartOrderDtoList.size() == 0) { //리스트가 비었거나 0개면
            return new ResponseEntity<String>("선택된 상품이 없습니다.", HttpStatus.BAD_REQUEST);
        }
        //주문로직에 장바구니 리스트와 멤버 정보 전달
        Long orderId = cartServiceImpl.orderCart(cartOrderDtoList, principal.getName());
        //주문번호 리턴
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteCart") //장바구니 삭제
    public String deleteCart(Long id) {
        cartServiceImpl.deleteById(id);
        return "redirect:/myCart";
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
