package com.ssafy.farmcu.api.entity.order;

import com.ssafy.farmcu.api.entity.store.Item;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;


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

//    @Column(length = 10, nullable = false)
//    private String oitemStatus;

    @Column(name = "oitem_count")
    private Integer oitemCount;

    @Column(name = "oitem_created_at")
    @CreationTimestamp
    private Timestamp oitemCreatedAt;

    private int orderPrice;

    // 연결
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Order.class)
    @JoinColumn(name = "order_id", updatable = false)
    private Order order;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Item.class)
    @JoinColumn(name = "item_id", updatable = false)
    private Item item;

    //빌더
    @Builder
    public OrderItem(Long oitemId, Integer oitemCount, Timestamp oitemCreatedAt ) {
        this.oitemId = oitemId;
        this.oitemCount = oitemCount;
//      this.oitemStatus = oitemStatus;
        this.oitemCreatedAt = oitemCreatedAt;

    }

    // 주문 상품 상세 정보 생성
    public static OrderItem createOrderItem(Item item, Integer oitemCount) {
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setOitemCount(oitemCount);

        // 주문 상품 재고 차감
//        orderItem.removeStock(oitemCount);
        return orderItem;
    }

    // 주문 번호 주입
    public  void addOrderNum(Order order){
        this.order = order;
    }
    // 주문 상품에 주문 번호 주입
    public void addOrderId(Order order) { this.order = order; }

    //총액
    public int getTotalPrice(){
        return orderPrice * oitemCount;
    }

    // 주문 취소 시 재고 원상 복구
    public void cancel() { this.getItem().addStock(oitemCount); }

}