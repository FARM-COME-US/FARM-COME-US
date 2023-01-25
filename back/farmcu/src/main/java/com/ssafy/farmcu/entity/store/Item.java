package com.ssafy.farmcu.entity.store;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;



@Getter
@NoArgsConstructor
@Entity
@Table(name = "item")
public class Item {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", unique = true, nullable = false)
    private Long item_id;

    @Column(length = 15, nullable = false)
    private String item_name;

    @Column(length = 255, nullable = false)
    private String item_description;

    @Column(length = 255, nullable = false)
    private String item_img;

    @Column(length = 50, nullable = false)
    private Integer item_price;

    @Column(length = 50, nullable = false) Integer item_discount;

    @Column
    private Integer item_stock;

    // 외래 키
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Category.class)
    @JoinColumn(name = "category_id", updatable = false)
    private Category category;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Store.class)
    @JoinColumn(name = "store_id", updatable = false)
    private Store store;

    //빌더
    @Builder
    public Item(Long item_id, String item_name, String item_description, String item_img, Integer item_discount, Integer item_price, Integer item_stock ) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.item_description = item_description;
        this.item_img = item_img;
        this.item_price = item_price;
        this.item_discount = item_discount;
        this.item_stock = item_stock;

    }
}