package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.order.pay.KaKaoPay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KaKaoPayRepository extends JpaRepository<KaKaoPay, Long> {
}
