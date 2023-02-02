package com.ssafy.farmcu.api.entity.store;

import com.ssafy.farmcu.exception.OutOfStockException;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@Table(name = "item")
public class Item {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @Column(length = 15, nullable = false)
    private String itemName;

    @Column(nullable = false)
    private String itemDescription;

    @Column(nullable = false)
    private String itemImg;

    @Column(nullable = false)
    private int itemPrice;

    @Column(nullable = false)
    private int itemDiscount;

    @Column
    private int itemStock;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp itemCreatedAt;

    //연결
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Category.class)
    @JoinColumn(name = "category_code", updatable = false)
    private Category category;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Store.class)
    @JoinColumn(name = "store_id", updatable = false)
    private Store store;

    //연관 관계 메서드
//    public void setCategory(Category category) {
//        this.category = category;
//        category.getItem().add(this);
//    }
//
//    public void setStore(Store store) {
//        this.store = store;
//        store.getItem().add(this);
//    }

    //빌더
    @Builder
    public Item(Long itemId, String itemName, String itemDescription, String itemImg, int itemDiscount, int itemPrice, int itemStock, Timestamp itemCreatedAt, Category category, Store store ) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemImg = itemImg;
        this.itemPrice = itemPrice;
        this.itemDiscount = itemDiscount;
        this.itemStock = itemStock;
        this.itemCreatedAt = itemCreatedAt;
        this.category = category;
        this.store = store;
    }

    //**  주문 관련   **//
    //주문: 재고 차감
    public void removeStock(int quantity){
        int remainStock = this.itemStock - quantity;

        if(remainStock < 0) {
            throw new OutOfStockException("재고가 부족합니다. \n현재 재고: " + this.itemStock);
        }else {
            this.itemStock = remainStock;
        }
    }

    //주문 취소: 재고 복구
    public void addStock(int quantity){
        this.itemStock += quantity;
    }

}
