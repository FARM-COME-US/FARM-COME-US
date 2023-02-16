package com.ssafy.farmcu.api.entity.order;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.pay.KaKaoPay;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_info")
public class Order {

    //필드
    @Id
    // pk 생성자 수정 필요
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    private LocalDateTime orderCreateAt;

    private int totalOrderPrice;

    //카카오 결제 tid
    public String tid;

    // 주문 : 주문 완료 - 주문취소
    public enum OrderStatus{
        ORDER, CANCEL
    }

    // 결제 : 결제 전 - 결제 - 결제 취소
    public enum PayStatus{
        BPAY, PAY, REFUND
    }

    // 배송 : 배송 전 / 배송 중 / 배송 완료
    public  enum DeliveryStatus {
        BSHIP, SHIP, ASHIP
    }

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    private PayStatus payStatus;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    //연결
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name="delivery_id")
    private DeliveryInfo delivery;

    @OneToOne
    @JoinColumn(name="pay_id")
    private KaKaoPay kaKaoPay;

    @OneToMany(mappedBy = "order")
    @JsonManagedReference
    private List<OrderItem> orderItems = new ArrayList<>();

    @Builder
    public Order(Member member, LocalDateTime orderCreateAt,String tid, DeliveryInfo delivery, KaKaoPay kaKaoPay, int totalOrderPrice, OrderStatus orderStatus, List<OrderItem> orderItems) {
        this.member = member;
        this.delivery = delivery;
        this.kaKaoPay = kaKaoPay;
        this.orderCreateAt = orderCreateAt;
        this.orderStatus = orderStatus;
        this.orderItems = orderItems;
        this.totalOrderPrice = totalOrderPrice;
        this.tid = tid;
    }

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
//        orderItem.setOitemPrice(getTotalOrderPrice());

    }

    //** 주문 생성 **//
    public static Order createOrder(Member member, List<OrderItem> orderItems){
        Order order = new Order();
        order.setMember(member);

        for(OrderItem orderItem : orderItems){
            order.addOrderItem(orderItem);
        }

        order.setTotalOrderPrice(order.getTotalPrice());
        order.setOrderCreateAt(LocalDateTime.now());

        order.setOrderStatus(OrderStatus.ORDER);
        order.setPayStatus(PayStatus.BPAY);
        order.setDeliveryStatus(DeliveryStatus.BSHIP);

        return order;
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
        System.out.println(orderStatus);
        for(OrderItem orderItem : orderItems){ //주문 취소, 재고 원상복구
            orderItem.cancel();
        }
    }

}

