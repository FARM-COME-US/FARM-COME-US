package com.ssafy.farmcu.api.dto.item;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ItemSearchReq {

    private Long categoryCode;
    private String itemName;

}
