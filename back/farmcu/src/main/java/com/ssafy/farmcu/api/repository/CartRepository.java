package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findById(Long num);
//    List<Cart> findByMember(Member member);
    List<Cart> findByMember(Long memberId);
    void deleteByCartId(Long cartId);
    /* 장바구니 아이디 리스트 기반으로 장바구니 상품 가져오기 */
//    List<Cart> findByIdIn(List<Long> ids);


//
//    Optional<Cart> findByIdAndMemberId(Long cartId, Long memberId);
//    void deleteById(Long id);
}
