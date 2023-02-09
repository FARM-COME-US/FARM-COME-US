package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.entity.store.Item;
import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartAddDto {

    // 장바구니 생성
    public static Cart createCart(Member member, Item item, int cartItemCount, int sale){
        Cart cart = new Cart(); // 새 장바구니
        cart.setMember(member);
        cart.setItem(item);//장바구니 속 상품 정보
        cart.setCartItemCount(cartItemCount); //장바구니에 담은 상품 개수

        return cart;
    }
    private Long memberId;

    public CartAddDto(Cart cart) {
        this.memberId = cart.getMember().getMemberId();

//        this.memberId = cart.getMember().getMemberId()
    }


}
