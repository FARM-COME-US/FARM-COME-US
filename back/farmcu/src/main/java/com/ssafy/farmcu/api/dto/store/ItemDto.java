package com.ssafy.farmcu.api.dto.store;

import com.ssafy.farmcu.api.entity.store.Item;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {

    private Long itemId;
    private String itemName;
    private String itemDescription;
    private int itemPrice;
    private int itemDiscount;
    private int itemStock;
    private String itemCreatedAt;
    private String titleCategoryName;
    private String detailCategoryName;
    private Long storeId;

    public ItemDto(Item item) {
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.itemDescription = item.getItemDescription();
        this.itemPrice = item.getItemPrice();
        this.itemDiscount = item.getItemDiscount();
        this.itemStock = item.getItemStock();
        this.itemCreatedAt = item.getItemCreatedAt().toString();
        this.titleCategoryName = item.getCategoryTitle().getTitleName();
        this.detailCategoryName = item.getCategoryDetail().getDetailName();
        this.storeId = item.getStore().getStoreId();
    }

}
