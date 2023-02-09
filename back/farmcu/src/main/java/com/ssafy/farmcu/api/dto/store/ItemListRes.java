package com.ssafy.farmcu.api.dto.store;

import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.ItemImage;

public class ItemListRes {

    private String itemName;
    private String itemDescription;
    private int itemPrice;
    private int itemDiscount;
    private String storeName;

    private String originalName;
    private String savedPath;

    public ItemListRes(Item item, ItemImage itemImage) {
        this.itemName = item.getItemName();
        this.itemDescription = item.getItemDescription();
        this.itemPrice = item.getItemPrice();
        this.itemDiscount = item.getItemDiscount();
        this.storeName = item.getStore().getStoreName();
        this.originalName = itemImage.getOriginalName();
        this.savedPath = itemImage.getSavedPath();
    }

}
