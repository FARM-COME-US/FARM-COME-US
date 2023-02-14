package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.entity.store.Item;
import com.sun.istack.NotNull;
import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto {

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
}
