package com.ssafy.farmcu.oauth.repository;

import com.ssafy.farmcu.entity.member.MemberRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRefreshTokenRepository extends JpaRepository<MemberRefreshToken, Long> {

    //    MemberRefreshToken findByEmail(String email);
    MemberRefreshToken findById(String id);
    boolean deleteById(String id);
    MemberRefreshToken findByIdAndRefreshToken(String id, String refreshToken);
}

