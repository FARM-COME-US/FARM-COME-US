package com.ssafy.farmcu.api.repository;

import com.ssafy.farmcu.api.entity.store.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryCode(Long categoryCode);

}
