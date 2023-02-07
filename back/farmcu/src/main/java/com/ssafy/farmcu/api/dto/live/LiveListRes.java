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
public class LiveListRes {

    private Long liveId;
    private String liveTitle;
    private int itemPrice;
    private int liveDiscount;
    private String liveStart;
    private int liveViewers;
    private String storeName;

    public LiveListRes(Live live) {
        this.liveId = live.getLiveId();
        this.liveTitle = live.getLiveTitle();
        this.itemPrice = live.getItem().getItemPrice();
        this.liveDiscount = live.getLiveDiscount();
        this.liveStart = String.valueOf(live.getLiveStart());
        this.liveViewers = live.getLiveViewers();
        this.storeName = live.getStore().getStoreName();
    }

}
