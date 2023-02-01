package com.ssafy.farmcu.repository;

import com.ssafy.farmcu.entity.store.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryCode(Long categoryCode);

}
