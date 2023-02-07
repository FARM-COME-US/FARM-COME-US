package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.dto.order.CartRequestDto;
import com.ssafy.farmcu.api.dto.order.CartResponseDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;

import java.util.List;
import java.util.Map;

public interface CartService {


    // 장바구니에 상품 담기
    public Long addCart(CartRequestDto cartRequestDto, String username);

    // 로그인 사용자 장바구니 목록 조회
    public List<Cart> findMyCart(Long memberId);

    // 장바구니 항목 주문
    public Long orderCart(List<CartOrderDto> cartOrderDtoList, String username);

    //     장바구니 항목 삭제
    public void deleteCart(Long cartId);



}
