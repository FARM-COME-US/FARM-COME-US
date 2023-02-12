package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.store.CategoryDetail;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.Store;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findByItemId(Long itemId);
    Slice<Item> findByStore(Store store, Pageable pageable);
    Slice<Item> findByItemNameLike(String itemName, Pageable pageable);
    Slice<Item> findByCategoryDetailAndItemNameLike(CategoryDetail categoryDetail, String itemName, Pageable pageable);
    void deleteByItemId(Long itemId);

}
