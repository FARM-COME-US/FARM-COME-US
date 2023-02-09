package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.dto.store.StoreImageDto;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.ItemImage;
import com.ssafy.farmcu.api.entity.store.Store;
import com.ssafy.farmcu.api.entity.store.StoreImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoreImageRepository extends JpaRepository<StoreImage, Long> {
    Optional<StoreImage> findByStoreAndStoreImageId(Store store, Long storeImageId);
    List<StoreImage> findAllByStore(Store store);
    void deleteByStoreImageId(Long storeImageId);
}
