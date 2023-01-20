package com.ssafy.fcmus.entity.order;

import com.ssafy.fcmus.entity.member.Member;
import com.ssafy.fcmus.entity.store.Item;
import com.ssafy.fcmus.entity.store.Store;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "cart_list")
public class CartList {
    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_list")
    private Long id;

    @Column
    private Integer cart_item_count;

    // 외래 키
    @OneToOne
    @JoinColumn(name="member_id")
    private Member member;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Item.class)
    @JoinColumn(name = "item_id", updatable = false)
    private Item item;

    @Builder
    public CartList(Integer cart_item_count) {
        this.cart_item_count = cart_item_count;

    }

}
