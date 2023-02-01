package com.ssafy.farmcu.repository;

<<<<<<< HEAD
=======
import com.ssafy.farmcu.entity.store.Category;
>>>>>>> 61ad1482338307786df48abfe77acbde92312944
import com.ssafy.farmcu.entity.store.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByItemId(Long num);

=======
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Item findByItemId(Long itemId);
    //    List<Item> findByItemName(String itemName);
    //    List<Item> findByCategory(Long categoryCode);
    List<Item> findByCategoryAndItemName(Category category, String itemName);
>>>>>>> 61ad1482338307786df48abfe77acbde92312944

}
