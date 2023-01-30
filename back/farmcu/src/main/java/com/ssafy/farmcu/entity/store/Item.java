package com.ssafy.farmcu.entity.store;

import com.ssafy.farmcu.entity.live.Live;
import com.ssafy.farmcu.entity.order.Cart;
import com.ssafy.farmcu.entity.order.OrderItem;

import com.ssafy.farmcu.exception.OutOfStockException;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "item")
public class Item {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", unique = true, nullable = false)
    private Long itemId;

    @Column(length = 15, nullable = false)
    private String itemName;

    @Column(length = 255, nullable = false)
    private String itemDescription;

    @Column(length = 255, nullable = false)
    private String itemImg;

    @Column(length = 50, nullable = false)
    private Integer itemPrice;

    @Column(length = 50, nullable = false)
    private Integer itemDiscount;

    @Column
    private Integer itemStock;

    // 연결
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Category.class)
    @JoinColumn(name = "category_id", updatable = false)
    private Category category;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Store.class)
    @JoinColumn(name = "store_id", updatable = false)
    private Store store;

    @OneToOne(mappedBy = "item")
    private Live live;

    @OneToMany(mappedBy = "item")
    private List<Cart> cart = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<OrderItem> orderItem = new ArrayList<>();

    //빌더
    @Builder
    public Item(Long itemID, String itemName, String itemDescription, String itemImg, Integer itemDiscount, Integer itemPrice, Integer itemStock ) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemImg = itemImg;
        this.itemPrice = itemPrice;
        this.itemDiscount = itemDiscount;
        this.itemStock = itemStock;
    }


    //**   주문 관련   **//
    //주문시 재고 차감
    public void removeStock(int quantity){
        int remainStock = this.itemStock - quantity;

        if(remainStock < 0) {
            throw new OutOfStockException("상품의 재고가 부족합니다. \n부족 수량: " + -(remainStock) + ", 현재 재고: " + this.itemStock);
        }else {
            this.itemStock = remainStock;
        }
    }

    //주문 취소시 재고 복구
    public void addStock(int quantity){
        this.itemStock += quantity;
    }
}
