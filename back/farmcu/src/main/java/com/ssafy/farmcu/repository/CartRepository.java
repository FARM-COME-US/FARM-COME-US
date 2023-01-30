package com.ssafy.farmcu.repository;

import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.order.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByCartId(Long num);
    List<Cart> findAll();
    List<Cart> findByMember(Member member);
    void deleteById(Long id);

}
