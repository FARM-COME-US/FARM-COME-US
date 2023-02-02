package com.ssafy.farmcu.api.dto.live;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveInsertReq {

    private Long liveId;
    private String liveTitle;
    private int liveDiscount;
    private int liveStock;
    private String liveStart;
    private Long itemId;
    private Long StoreId;

}
