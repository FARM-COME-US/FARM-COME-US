package com.ssafy.farmcu.entity.order;

import com.ssafy.farmcu.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order")
// 주문 그 자체, 예: order_info(pk = 1) = 배추*3 + 당근*4 의 값이 담겨 있음
public class Order {

//     주문 상태
//     public emun OrderStatus{
//        ORDER, CANCLE
//     }


    //필드
    @Id
    // pk 생성자 수정 필요
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "order_created_at")
    @CreationTimestamp
    private Timestamp orderCreateAt;

    // 주문 - 결제 대기 - 결제 완료 - 배송 중 - 배송 완료 / B = before, A = after
    public enum OrderStatus{
        ORDER, BPAY, APAY, BSHIPPING, ASHIPPING
    }

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    //연결
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Member.class)
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    @OneToOne
    @JoinColumn(name="delivery_id")
    private DeliveryInfo delivery;


    @OneToMany(mappedBy = "order_info")
    private List<OrderItem> orderItems = new ArrayList<>();


    @Builder
    public Order(Member member, Timestamp orderCreateAt, OrderStatus orderStatus, List<OrderItem> orderItems) {
        this.member = member;
        this.orderCreateAt = orderCreateAt;
        this.orderStatus = orderStatus;
        this.orderItems = orderItems;
    }

    // 주문에 주문아이템 주입
    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
        // OrderItem에 작성해둔 setOrder을 여기로 갖고 오는?

    }
}

