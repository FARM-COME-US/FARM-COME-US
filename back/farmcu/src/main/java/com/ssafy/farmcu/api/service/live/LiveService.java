package com.ssafy.farmcu.api.service.live;

import com.ssafy.farmcu.api.dto.live.LiveDetailRes;
import com.ssafy.farmcu.api.dto.live.LiveInsertReq;
import com.ssafy.farmcu.api.dto.live.LiveListRes;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface LiveService {

    //라이브 생성
    public boolean saveLive(LiveInsertReq liveInsertReq);

    //라이브 목록 조회 (검색)
    public HashMap<String, Object> findLivesByLiveTitleLike(String liveTitle, Pageable pageable);

    //라이브 상세 조회
    public LiveDetailRes findOne(Long liveId);

    //라이브 수정
    public boolean updateLive(LiveInsertReq liveInsertReq);

    //라이브 삭제
    public boolean deleteLive(Long liveId);

}
