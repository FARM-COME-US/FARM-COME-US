package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.store.Store;
import com.ssafy.farmcu.api.entity.store.StoreLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StoreLikeRepository extends JpaRepository<StoreLike, Long> {

    @Query(value = "SELECT s FROM StoreLike s WHERE s.member.memberId = :memberId")
    Optional<List<StoreLike>> findStoreLikeByMember(Long memberId);

    @Query(value = "SELECT s.member.memberId FROM StoreLike s WHERE s.store.storeId = :storeId")
    Optional<List<String>> findStoreLikeByStore(Long storeId);


}
