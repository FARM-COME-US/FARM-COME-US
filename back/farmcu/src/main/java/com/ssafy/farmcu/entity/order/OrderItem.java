package com.ssafy.farmcu.entity.order;

import com.ssafy.farmcu.entity.store.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "order_item")
public class OrderItem {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oitem_id", unique = true, nullable = false)
    private Long oitem_id;

    @Column(length = 10, nullable = false)
    private String oitem_status;

    @Column
    private Integer oitem_count;

    @Column
    @CreationTimestamp
    private Timestamp oitem_created_at;

    // 외래 키
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = OrderInfo.class)
    @JoinColumn(name = "order_id", updatable = false)
    private OrderInfo order;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Item.class)
    @JoinColumn(name = "item_id", updatable = false)
    private Item item;

    //빌더
    @Builder
    public OrderItem(Long oitem_id, String oitem_status, Integer oitem_count, Timestamp oitem_created_at ) {
        this.oitem_id = oitem_id;
        this.oitem_count = oitem_count;
        this.oitem_status = oitem_status;
        this.oitem_created_at = oitem_created_at;
    }
}