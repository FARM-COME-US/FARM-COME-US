package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.CartInfoDto;

public interface CartService {

    // 장바구니에 상품 담기
    public boolean addCart(CartInfoDto cartInfoDto);

    // 로그인 사용자 장바구니 목록 조회
//    public List<CartInfoDto> findByMemberCart(CartMemberReq cartMemberReq);

    // 장바구니 항목 주문

    // 장바구니 항목 삭제



}
