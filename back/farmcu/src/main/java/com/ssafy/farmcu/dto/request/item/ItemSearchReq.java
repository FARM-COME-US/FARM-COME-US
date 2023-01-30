package com.ssafy.farmcu.dto.request.item;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ItemSearchReq {

    String itemName;
    Long categoryCode;

}
