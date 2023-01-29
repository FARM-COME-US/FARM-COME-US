package com.ssafy.farmcu.entity.order;


import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.store.Item;

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

//    private Integer citemCount;

    // 연결

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

    //장바구니 생성
    public static Cart createCart(Member member, Item Item, int citemCount){
        Cart cart = new Cart(); //새로운 장바구니
        cart.setMember(member);
        cart.setItem(Item);//담은 상품 정보
//        cart.setCitemCount(citemCount); //장바구니에 담은 상품 개수

        return cart;
    }

//    //총액
//    public int getTotalPrice(){
//        return Item.getItemPrice * citemCount;
//    }

}
