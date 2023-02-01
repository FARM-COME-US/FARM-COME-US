package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.live.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LiveRepository extends JpaRepository<Live, Long> {
}
