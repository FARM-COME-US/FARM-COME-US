package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;

import java.util.List;

public interface CartService {


    // 장바구니에 상품 담기
    public Long addCart(CartDto cartDto);


    // 로그인 사용자 장바구니 목록 조회
    public List<Cart> findMyCart(Member member);

    // 장바구니 항목 주문
//    void orderCart(OrderInfoDto orderInfoDto);

//     장바구니 항목 삭제
    public void deleteCart(Long cartId);



}
