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
    void deleteById(Long id);
}
