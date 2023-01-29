package com.ssafy.farmcu.repository;

import com.ssafy.farmcu.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findById(String id);

}
