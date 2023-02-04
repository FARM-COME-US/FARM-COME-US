package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.dto.member.MemberListRes;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.store.Store;
import com.ssafy.farmcu.api.entity.store.StoreLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StoreLikeRepository extends JpaRepository<StoreLike, Long> {

    @Query(value = "SELECT s FROM StoreLike s WHERE s.member.memberId = :memberId")
    List<StoreLike> findStoreLikeByMember(Long memberId);

//    @Query(value = "SELECT s.member FROM StoreLike s WHERE s.store.storeId = :storeId")
//    List<Member> findStoreLikeByStore(Long storeId);

    @Query("select s.member.memberId from StoreLike s where s.store.storeId = :storeId")
    List<Long> findMemberIdByStoreId(Long storeId);

    @Query("select new com.ssafy.farmcu.api.dto.member.MemberListRes(m.memberId, m.id, m.name, m.nickname, m.profileImg) from Member m join StoreLike sl where sl.store.storeId = :storeId")
    List<MemberListRes> findStoreLikeByStore(Long storeId);
}
