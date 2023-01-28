package com.ssafy.farmcu.entity.order;


import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.store.Item;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {
    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @Column(name = "cart_item_count")
    private Integer cartItemCount;

    // 연결
    // modify : OneToOne -> ManyToOne
    @ManyToOne
    @JoinColumn(name="member_id", nullable=false)
    private Member member;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Item.class)
    @JoinColumn(name = "item_id", updatable = false)
    private Item item;



    @Builder
    public Cart(Integer cartItemCount) {
        this.cartItemCount = cartItemCount;

    }

}
