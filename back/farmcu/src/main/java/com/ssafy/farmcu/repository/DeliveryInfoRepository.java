package com.ssafy.farmcu.repository;

import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.order.Cart;
import com.ssafy.farmcu.entity.order.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryInfoRepository extends JpaRepository <DeliveryInfo, Long> {
    Optional<DeliveryInfo> findById(Long num);

    List<DeliveryInfo> findAll();
    List<DeliveryInfo> findByMember(Member member);

    void deleteById(Long id);
}
