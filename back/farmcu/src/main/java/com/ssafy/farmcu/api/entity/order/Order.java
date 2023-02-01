package com.ssafy.farmcu.api.entity.order;

import com.ssafy.farmcu.api.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    // 주문 - 결제 대기 - 결제 완료 - 배송 중 - 배송 완료 - 주문취소 / B = before, A = after
    public enum OrderStatus{
        ORDER, BPAY, APAY, BSHIPPING, ASHIPPING, CANCEL
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

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();

    @Builder
    public Order(Member member, Timestamp orderCreateAt, OrderStatus orderStatus, List<OrderItem> orderItems) {
        this.member = member;
        this.orderCreateAt = orderCreateAt;
        this.orderStatus = orderStatus;
        this.orderItems = orderItems;
    }

    // 주문에 주문 상품 주입 -> OrderItem.java 의 setOrder
    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    //** 주문 생성 **//
    public static Order createOrder(Member member, List<OrderItem> orderItems){
        Order order = new Order();
        order.setMember(member); //멤버 정보 set

        for(OrderItem orderItem : orderItems){ //주문 상세 리스트 주입
            order.addOrderItem(orderItem);
        }

        order.setOrderStatus(OrderStatus.ORDER); //주문상태를 ORDER로 set
        order.setOrderCreateAt(Timestamp.valueOf("?")); //주문시간
        return order; //완성된 주문정보
    }
    //** 전체 주문 가격 조회 **//
    public int getTotalPrice(){
        int totalPrice = 0;

        for(OrderItem orderItem : orderItems){
            totalPrice += orderItem.getTotalPrice();
        }
        return totalPrice;
    }

    //** 주문 취소 **//
    public void updateOrder(){
        this.orderStatus = OrderStatus.CANCEL; //주문 상태를 CANCEL로

        for(OrderItem orderItem : orderItems){ //주문 취소, 재고 원상복구
            orderItem.cancel();
        }
    }
}

