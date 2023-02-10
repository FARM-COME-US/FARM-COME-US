package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.live.Live;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LiveRepository extends JpaRepository<Live, Long> {

    Slice<Live> findByLiveTitleLike(String liveTitle, Pageable pageable);
    Optional<Live> findByLiveId(Long liveId);
    void deleteByLiveId(Long liveId);

}
