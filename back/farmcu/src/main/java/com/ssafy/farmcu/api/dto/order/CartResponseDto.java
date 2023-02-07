package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.Store;
import com.sun.istack.NotNull;
import lombok.*;

@Getter @ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto {

    private Long cartId;
    private Long itemId;

    private int sale;
    private int cartItemCount;
    private int itemPrice;
    private int totalPrice;

    private String itemImg;
    private String storeName;

    @Builder
    public CartResponseDto(Cart cart, Item item, Store store, Long itemId, Long cartId,
                           int sale, int cartItemCount, int itemPrice, int totalPrice,
                           String itemImg, String storeName) {

        this.cartId = cart.getCartId();
        this.itemId = cart.getItem().getItemId();
        this.sale = cart.getItem().getItemDiscount();
        this.cartItemCount = cart.getCartItemCount();
        this.itemPrice = cart.getItem().getItemPrice();
        this.totalPrice = cart.getTotalPrice();
        this.itemImg = cart.getItem().getItemImg();
        this.storeName = cart.getItem().getStore().getStoreImg();
    }
}
