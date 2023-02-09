package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.sun.istack.NotNull;
import lombok.*;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {

    @NotNull
    private int cartItemCount;

    @NotNull
    private Long memberId;

    @NotNull
    private Long itemId;

//    private Long storeId;   // => 같은 상점끼리 묶어서 보여주기
//    private Long cartId;
//    private int getTotalPrice;
//    private int itemSalePercent;
//    private String cartItemImg;
//    private String storeName;

    @Getter @AllArgsConstructor
    @ToString
    public static class CartInfo {

        private Long cartId;
        private ItemDto item;
        private int cartItemCount;
        private int getTotalPrice;

//        this.cartId = cart.getCartId();
//        this.memberId = cart.getMember().getMemberId();
//        this.storeId = cart.getItem().getStore().getStoreId();
//        this.itemId = cart.getItem().getItemId();
//        this.getTotalPrice = cart.getTotalPrice();
//        this.cartItemCount = cart.getCartItemCount();
//        this.cartItemImg = cart.getItem().getItemImg();
//        this.storeName = cart.getItem().getStore().getStoreName();
//        this.itemSalePercent = cart.getItem().getItemDiscount();
//        this.getTotalPrice = cartItemCount*cart.getItem().getItemPrice();

    }


}
