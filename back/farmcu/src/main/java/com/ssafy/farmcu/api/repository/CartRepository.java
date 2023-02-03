package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.order.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findById(Long num);
    List<Cart> findAll();
<<<<<<< HEAD
//
//    Optional<Cart> findByIdAndMemberId(Long cartId, Long memberId);
//    void deleteById(Long id);
=======
    List<Cart> findByMember(Member member);
    void deleteById(Long id);
>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
}
