/**
 *
 * CartList
 * CartList Entity
 * 마지막 수정일 2022-01-26
 **/

package com.ssafy.fcmus.entity.order;

import com.ssafy.fcmus.entity.member.Member;
import com.ssafy.fcmus.entity.store.Item;
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
    private Long id;

    @Column
    private Integer cart_item_count;

    // 연결
    // modify : OneToOne -> ManyToOne
    @ManyToOne
    @JoinColumn(name="member_id", nullable=false)
    private Member member;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Item.class)
    @JoinColumn(name = "item_id", updatable = false)
    private Item item;



//    @Builder
//    public Cart(Integer cart_item_count) {
//        this.cart_item_count = cart_item_count;
//
//    }

}
