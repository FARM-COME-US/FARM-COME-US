package com.ssafy.farmcu.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {

    Long itemId;
    String itemName;
    String itemDescription;
    String itemImg;
    int itemPrice;
    int itemDiscount;
    int itemStock;
    Long categoryCode;
    Long storeId;
    String itemCreatedAt;

}
