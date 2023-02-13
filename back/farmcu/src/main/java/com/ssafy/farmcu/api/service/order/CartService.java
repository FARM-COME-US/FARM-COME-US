package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;

public interface CartService {


    // 장바구니에 상품 담기
    public Long addCart(CartDto cartDto);

    //멤버 장바구니 목록
//    public HashMap<String, Object> findCartsByMember(Long memberId, Pageable pageable);

    // 로그인 사용자 장바구니 목록 조회
    public List<Cart> findMyCart(Member member);

    // 장바구니 항목 주문
    public Long orderCart(List<CartOrderDto> cartOrderDtoList, String memberId);

//     장바구니 항목 삭제
    public void deleteCart(Long cartId);

    public List<Cart> findAllCart();



}
