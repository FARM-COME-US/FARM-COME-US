package com.ssafy.fcmus.entity.order;

import com.ssafy.fcmus.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "order")
public class OrderInfo {
    //필드
    @Id
    // pk 생성자 수정 필요
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Column
    @CreationTimestamp
    private Timestamp order_created_at;

    //외래 키
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Member.class)
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    @OneToOne
    @JoinColumn(name="delivery_id")
    private DeliveryInfo delivery;

    @Builder
    public OrderInfo(Timestamp order_created_at) {
        this.order_created_at = order_created_at;

    }
}

