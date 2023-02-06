package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findById(Long num);

    List<Order> findAll();
}
