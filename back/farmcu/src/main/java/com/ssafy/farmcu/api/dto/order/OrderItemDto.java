package com.ssafy.farmcu.api.dto.order;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderItemDto {
    private Long itemId;
    private String itemName;
    private String itemDescription;
    private String itemImg;
    private int itemPrice;
    private int itemDiscount;
    private int itemStock;
    private String itemCreatedAt;
    private Long categoryCode;
    private Long storeId;

}
