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

    private int cartItemCount;

    private int itemPrice;

    private int sale;

    private int getTotalPrice;


    // 연결
    @ManyToOne
    @JoinColumn(name="memberId", nullable=false)
    private Member member;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Item.class)
    @JoinColumn(name = "item_id", updatable = false)
    private Item item;

    @Builder
    public Cart(Long cartId,Item item, int itemPrice, int sale, int getTotalPrice,int cartItemCount, Member member) {
        this.cartId = cartId;
        this.item = item;
        this.member = member;
        this.getTotalPrice = getTotalPrice();
        this.cartItemCount = cartItemCount;
        this.sale = item.getItemDiscount();
        this.itemPrice = item.getItemPrice();
    }
    public int getTotalPrice(){
        return itemPrice*(100-sale)/100*cartItemCount;
    }

    public static Cart createCart(Member member, Item item, int cartItemCount){
        Cart cart = new Cart(); // 새 장바구니
        cart.setMember(member);
        cart.setItem(item);//장바구니 속 상품 정보
        cart.setCartItemCount(cartItemCount); //장바구니에 담은 상품 개수

        return cart;
    }

}
