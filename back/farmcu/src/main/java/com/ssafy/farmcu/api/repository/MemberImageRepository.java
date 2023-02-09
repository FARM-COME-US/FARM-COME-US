package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.member.MemberImage;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberImageRepository extends JpaRepository<MemberImage, Long> {
    Optional<MemberImage> findByMemberAndMemberImageId(Member member, Long MemberImageId);
    List<MemberImage> findAllByMember(Member member);
    void deleteByMemberImageId(Long MemberImageId);
}
