package com.ssafy.farmcu.api.entity.order;

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

    private int orderPrice;

    // 연결
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order_info;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    //빌더
    @Builder
    public OrderItem(Item item,Long oitemId, int oitemCount, LocalDateTime oitemCreatedAt, int orderPrice ) {
        this.oitemId = oitemId;
        this.oitemCount = oitemCount;
        this.oitemCreatedAt = oitemCreatedAt;
        this.orderPrice = item.getItemPrice() - item.getItemDiscount();
    }

    // 주문 상품 상세 정보 생성
    public static OrderItem createOrderItem(Item item, Integer oitemCount) {
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setOitemCount(oitemCount);
        orderItem.setOrderPrice(builder().orderPrice); //이 주문의 당시 가격

        // 주문 상품 재고 차감
        item.removeStock(builder().oitemCount);
        return orderItem;
    }

    // 주문 번호 주입
    public  void addOrderNum(Order order){
        this.order_info = order;
    }

    //총액
    public int getTotalPrice(){
        return orderPrice * oitemCount;
    }

    // 주문 취소 시 재고 원상 복구
    public void cancel() { this.getItem().addStock(oitemCount); }

}