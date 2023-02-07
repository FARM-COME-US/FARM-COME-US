package com.ssafy.farmcu.api.dto.store;

import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.ItemImage;

public class ItemListRes {

    private String itemName;
    private String itemDescription;
    private int itemPrice;
    private int itemDiscount;
    private Long storeName;

    private String originalName;
    private String savedPath;

    private Boolean hasNextPage;

    public ItemListRes(Item item, ItemImage itemImage, Boolean hasNextPage) {
        this.itemName = item.getItemName();
        this.itemDescription = item.getItemDescription();
        this.itemPrice = item.getItemPrice();
        this.itemDiscount = item.getItemDiscount();
        this.originalName = itemImage.getOriginalName();
        this.savedPath = itemImage.getSavedPath();
        this.hasNextPage = hasNextPage;
    }

}
