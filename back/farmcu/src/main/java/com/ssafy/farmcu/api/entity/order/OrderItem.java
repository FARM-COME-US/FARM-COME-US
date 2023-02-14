package com.ssafy.farmcu.api.entity.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.farmcu.api.entity.store.Item;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "order_item")
public class OrderItem {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oitem_id", unique = true, nullable = false)
    private Long oitemId;

    private int oitemCount;

    private LocalDateTime oitemCreatedAt;

    private int oitemPrice;

    private Long storeNum;

    // 연결
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    //빌더
    @Builder
    public OrderItem(Order order, Item item, Long oitemId,Long storeNum, int oitemCount, LocalDateTime oitemCreatedAt, int oitemPrice ) {
        this.order = order;
        this.item = item;
        this.oitemId = oitemId;
        this.storeNum = storeNum;
        this.oitemCount = oitemCount;
        this.oitemCreatedAt = oitemCreatedAt;
        this.oitemPrice = oitemPrice;
    }

    // 주문 상품 상세 정보 생성
    public static OrderItem createOrderItem(Item item, int oitemCount) {
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setOitemCount(oitemCount);
        orderItem.setOitemPrice( oitemCount * item.getItemPrice() * (100 - item.getItemDiscount()) / 100);
        orderItem.setOitemCreatedAt(LocalDateTime.now()); //주문시간
        orderItem.setStoreNum(item.getStore().getStoreId());
        // 주문 상품 재고 차감
        item.removeStock(oitemCount);
        return orderItem;
    }

    // 주문 번호 주입
    public  void addOrderNum(Order order){
        this.order = order;
    }

    //총액
    public int getTotalPrice(){
        return oitemPrice;
    }

    //스토어



    // 주문 취소 시 재고 원상 복구
    public void cancel() { this.getItem().addStock(oitemCount); }

}