package com.ssafy.farmcu.api.service.store;

import com.ssafy.farmcu.api.dto.store.StoreLikeDto;
import com.ssafy.farmcu.api.dto.store.StoreLikeStoreListDto;

import java.util.List;

/**
 * ### Service method
 * - find
 * - save ex) saveItem
 * - delete
 * - update
 */
public interface StoreLikeService {
    public boolean saveLike(StoreLikeDto storeLikeDto);
    public boolean deleteLike(StoreLikeDto storeLikeDto);
    public List<StoreLikeStoreListDto> findLikes(Long memberId); // 멤버가 좋아요한 스토어 목록
    public List<String> findLikesId(Long storeId); // 해당 스토어의 좋아요 누른 유저 리스트
    public int getCount(Long storeId); // 해당 스토어 좋아요 누른 유저 count

}
