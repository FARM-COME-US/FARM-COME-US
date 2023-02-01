package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
//    Store findByStoreId(Long storeId);
    Optional<Store> findByStoreId(Long sotreId);


}
