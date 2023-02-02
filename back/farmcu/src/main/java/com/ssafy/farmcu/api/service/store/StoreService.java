package com.ssafy.farmcu.api.service.store;


import com.ssafy.farmcu.api.dto.store.StoreDto;

public interface StoreService {
    public boolean saveStore(StoreDto storeDto);
    public StoreDto findStoreInfo(Long storeId); // 스토어 정보 찾아오기
    public boolean updateStore(Long storeId, StoreDto storeDto); // 스토어 정보 수정
    public boolean deleteStore(Long storeId);

    }
