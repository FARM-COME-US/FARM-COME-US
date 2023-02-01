package com.ssafy.farmcu.repository;

import com.ssafy.farmcu.entity.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByStoreId(Long storeId);

}
