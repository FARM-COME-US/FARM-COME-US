package com.ssafy.farmcu.api.entity.order;

import com.ssafy.farmcu.api.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "delivery_info")
public class DeliveryInfo {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id", unique = true, nullable = false)
    private Long deliveryId;

    @Column(name = "delivery_name", length = 10, nullable = false)
    private String deliveryName;

    @Column(name = "delivery_addr",length = 255, nullable = false)
    private String deliveryAddr;

    @Column(name = "delivery_phone_number",length = 15, nullable = false)
    private String deliveryPhoneNumber;


    // 연결
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Member.class)
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    // 주문 관련 양방향 매핑 ==>> 연관관계의 주인은 order에 둠
    // @OneToOne(mappedBy = "delivery" ,orphanRemoval = true)  ==> 아래 코드랑 같이 테스트 해보기
    @OneToOne(mappedBy = "delivery",fetch = FetchType.LAZY)
    private Order order;



    // 송장 번호 or 예송 배정 날짜를 판매자가 입력 => 구매자에게 배송 상태 상세 정보에 대한 정보 보여줌
    @Column
    private String deliveryMethod;

    //** 배송 상태 **//
    // 주문 (OrderStatus == 'APAY') 시 : 배송 전 - 배송 중 - 배송 완료 - 환불  / B = before, A = after
    public enum DeliveryStatus{
        BSHIPPING, SHIPPING, ASHIPPING, REFUND
    }

    @Enumerated(EnumType.STRING)
    // ORDINARY를 쓰면 EnumType을 사용하는 과정에서 중간에 다른 상태가 추가되면 순서가 밀리게 된다.
    // 즉 STRING 구분을 사용해 Enum을 정의한다.
    private DeliveryStatus deliveryStatus; // READY(배송 전), COMP(배송 중)

    //빌더
    @Builder
    public DeliveryInfo(Order order, Member member, Long deliveryId, String deliveryName, String deliveryAddr, String deliveryPhoneNumber, String deliveryMethod) {
        this.order = order;
        this.member = member;
        this.deliveryId = deliveryId;
        this.deliveryName = deliveryName;
        this.deliveryAddr = deliveryAddr;
        this.deliveryPhoneNumber = deliveryPhoneNumber;
        this.deliveryMethod = deliveryMethod;
    }
}