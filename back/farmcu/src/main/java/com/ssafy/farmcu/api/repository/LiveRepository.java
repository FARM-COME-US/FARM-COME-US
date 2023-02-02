package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.live.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LiveRepository extends JpaRepository<Live, Long> {

    List<Live> findByLiveTitleLike(String liveTitle);
    Optional<Live> findByLiveId(Long liveId);

    void deleteByLiveId(Long liveId);

}
