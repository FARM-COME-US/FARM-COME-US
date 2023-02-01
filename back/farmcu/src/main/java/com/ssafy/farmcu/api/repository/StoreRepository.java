package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByStoreId(Long storeId);

}
