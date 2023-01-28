package com.ssafy.farmcu.entity.order;

import com.ssafy.farmcu.entity.store.Item;
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

    //==생성 메서드==//
    public static OrderItem createOrderItem(Item item, int count, int oitemCount) {
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setOitemCount(oitemCount);

        return orderItem;
    }


}