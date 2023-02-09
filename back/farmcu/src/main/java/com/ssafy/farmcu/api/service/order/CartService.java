package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;

import java.util.List;

public interface CartService {


    // 장바구니에 상품 담기
    public Long addCart(CartDto cartDto);


    // 로그인 사용자 장바구니 목록 조회
<<<<<<< HEAD
    public List<Cart> findMyCart(Member member);
=======
<<<<<<< HEAD
//    public List<CartResponseDto> findMyCart(Long memberId);
=======
    public List<Cart> findMyCart(Long memberId);
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e

    // 장바구니 항목 주문
    public Long orderCart(List<CartOrderDto> cartOrderDtoList, String memberId);

//     장바구니 항목 삭제
    public void deleteCart(Long cartId);



}
