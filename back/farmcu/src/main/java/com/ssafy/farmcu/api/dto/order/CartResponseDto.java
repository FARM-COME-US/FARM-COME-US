package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter @ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto {

    private Long cartId;
    private Long itemId;
    private String sale;
    private int cartItemCount;
//    private Integer unitPrice;
//    private Long sellerId;


//    public static CartResponseDto createCart (Cart cart, CartProductDto cartProductDto) {
//        return new CartResponseDto(cart, cartProductDto);
//    }
//
//    @Builder
//    public CartResponseDto(Cart cart, CartProductDto cartProductDto) {
//        if (cartProductDto == null) {
//            this.cartId = cart.getId();
//            this.productId = -1L;
//        }
//        else {
//            this.cartId = cart.getId();
//            this.productId = cartProductDto.getId();
//            this.productThumbnail = cartProductDto.getThumbnail();
//            this.productName = cartProductDto.getName();
//            this.qty = cart.getQty();
//            this.unitPrice = cartProductDto.getPrice();
//            this.sellerId = cartProductDto.getSellerId();
//        }
//    }
}
