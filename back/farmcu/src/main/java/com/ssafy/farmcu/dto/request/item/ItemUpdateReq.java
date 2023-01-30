package com.ssafy.farmcu.dto.request.item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemUpdateReq {

    Long itemId;
    String itemName;
    String itemDescription;
    String itemImg;
    int itemPrice;
    int itemDiscount;
    int itemStock;
    Long categoryCode;

}
