package com.ssafy.farmcu.api.entity.order;

import com.ssafy.farmcu.api.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "delivery")
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

    // 주문 관련 양방향 매핑
    // @OneToOne(mappedBy = "delivery" ,orphanRemoval = true)  ==> 아래 코드랑 같이 테스트 해보기
    @OneToOne(mappedBy = "delivery",fetch = FetchType.LAZY)
    private Order order;

    //빌더
    @Builder
    public DeliveryInfo(Long deliveryId, String deliveryName, String deliveryAddr, String deliveryPhoneNumber ) {
        this.deliveryId = deliveryId;
        this.deliveryName = deliveryName;
        this.deliveryAddr = deliveryAddr;
        this.deliveryPhoneNumber = deliveryPhoneNumber;
    }
}