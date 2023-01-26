package com.ssafy.farmcu.entity.store;

import com.ssafy.farmcu.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;


@Getter
@NoArgsConstructor
@Entity
//@Table(name = "store")
public class Store {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id", unique = true, nullable = false)
    private Long store_id;

    @Column(length = 15, nullable = false)
    private String store_name;

    @Column(length = 255, nullable = false)
    private String store_description;

    @Column(length = 255, nullable = false)
    private String store_img;

    @Column(length = 50, nullable = false)
    private String store_street_addr;

    @Column(length = 50, nullable = false)
    private String store_detail_addr;

    @Column(length = 10, nullable = false)
    private String store_zipcode;

    @Column(length = 15, nullable = false)
    private String store_phone_number;

    @Column
    private Integer store_delivery_cost;

    @Column
    private Integer store_delivery_free;

    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;


    @OneToOne
    @JoinColumn(name="member_id")
    private Member member;

    //빌더
    @Builder
    public Store(Long store_id, String store_name, String store_description, String store_img, String store_street_addr, String store_detail_addr, String store_zipcode,Integer store_delivery_cost, Integer store_delivery_free, Timestamp createdAt ) {
        this.store_id = store_id;
        this.store_name = store_name;
        this.store_description = store_description;
        this.store_img = store_img;
        this.store_street_addr = store_street_addr;
        this.store_detail_addr = store_detail_addr;
        this.store_zipcode = store_zipcode;
        this.store_phone_number = store_phone_number;
        this.store_delivery_cost = store_delivery_cost;
        this.store_delivery_free = store_delivery_free;
        this.createdAt = createdAt;

    }
}