package com.ssafy.farmcu.api.entity.order;


import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.store.Item;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {
    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id", unique = true)
    private Long cartId;

    @Column(name = "cart_item_count")
    private Integer cartItemCount;


    // 연결

    @ManyToOne
    @JoinColumn(name="memberId", nullable=false)
    private Member member;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Item.class)
    @JoinColumn(name = "item_id", updatable = false)
    private Item item;


    @Builder
    public Cart(Integer cartItemCount) {
        this.cartItemCount = cartItemCount;
    }

    // create: cart
    public static Cart createCart(Member member, Item item, Integer cartItemCount){
        Cart cart = new Cart(); // 새 장바구니
        cart.setMember(member);
        cart.setItem(item);//장바구니 속 상품 정보
        cart.setCartItemCount(cartItemCount); //장바구니에 담은 상품 개수

        return cart;
    }

    //총액
//    public int getTotalPrice(){
//        return Item.getItem
//    }

}
