package com.ssafy.farmcu.repository;

import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.order.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    Optional<OrderItem> findById(Long num);

    List<OrderItem> findAll();

    List<OrderItem> findByOrderMember(Member member);

}
