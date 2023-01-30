package com.ssafy.farmcu.entity.store;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {
    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(length = 15, nullable = false)
    private String category_name;

    @OneToMany(mappedBy = "category")
    private List<Item> item = new ArrayList<>();

}

