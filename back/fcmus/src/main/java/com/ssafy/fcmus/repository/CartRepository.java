package com.ssafy.fcmus.repository;

import com.ssafy.fcmus.entity.member.Member;
import com.ssafy.fcmus.entity.order.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

}
