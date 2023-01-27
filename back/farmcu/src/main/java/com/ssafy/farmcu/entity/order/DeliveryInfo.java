package com.ssafy.farmcu.entity.order;

import com.ssafy.farmcu.entity.member.Member;
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
    private Long delivery_id;

    @Column(length = 10, nullable = false)
    private String delivery_name;

    @Column(length = 255, nullable = false)
    private String delivery_addr;

    @Column(length = 15, nullable = false)
    private String delivery_phone_number;


    // 연결
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Member.class)
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    @OneToOne(mappedBy = "delivery")
    private DeliveryInfo delivery;

    //빌더
    @Builder
    public DeliveryInfo(Long delivery_id, String delivery_name, String delivery_addr, String delivery_phone_number ) {
        this.delivery_id = delivery_id;
        this.delivery_name = delivery_name;
        this.delivery_addr = delivery_addr;
        this.delivery_phone_number = delivery_phone_number;

    }
}