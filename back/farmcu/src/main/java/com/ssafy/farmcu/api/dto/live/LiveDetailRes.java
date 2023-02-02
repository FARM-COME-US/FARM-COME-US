package com.ssafy.farmcu.api.dto.live;

import com.ssafy.farmcu.api.entity.live.Live;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveDetailRes {

    private Long liveId;
    private String liveTitle;
    private int itemPrice;
    private int liveDiscount;
    private int liveViewers;
    private int liveStock;
    private String itemName;
    private String StoreName;

    public LiveDetailRes(Live live) {
        this.liveId = live.getLiveId();
        this.liveTitle = live.getLiveTitle();
        this.itemPrice = live.getItem().getItemPrice();
        this.liveDiscount = live.getLiveDiscount();
        this.liveViewers = live.getLiveViewers();
        this.liveStock = live.getLiveStock();
        this.itemName = live.getItem().getItemName();
    }

}
