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
<<<<<<< HEAD
=======
<<<<<<< HEAD
    List<Cart> findByMember(Long member);
=======
//    List<Cart> findByMember(Member member);
    List<Cart> findByMember(Long memberId);
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1
    void deleteByCartId(Long cartId);
    /* 장바구니 아이디 리스트 기반으로 장바구니 상품 가져오기 */
//    List<Cart> findByIdIn(List<Long> ids);
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e


    void deleteAllByCartId(Long cartId);
    List<Cart> findByMember(Member member);
//
//    Optional<Cart> findByIdAndMemberId(Long cartId, Long memberId);
//    void deleteById(Long id);
}
