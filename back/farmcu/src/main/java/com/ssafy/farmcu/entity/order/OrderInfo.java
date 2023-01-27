package com.ssafy.farmcu.entity.order;

import com.ssafy.farmcu.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "order_info")
// 주문 그 자체, 예를 들어: order_info(pk = 1) = 배추*3 + 당근*4 의 값이 담겨 있음
public class OrderInfo {

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

    //연결
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Member.class)
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    @OneToOne
    @JoinColumn(name="delivery_id")
    private DeliveryInfo delivery;


    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItem = new ArrayList<>();

    @Builder
    public OrderInfo(Timestamp orderCreateAt) {
        this.orderCreateAt = orderCreateAt;
    }
}

