package com.ssafy.farmcu.api.dto.store;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ItemSearchReq {

    private String titleCategoryName;
    private String detailCategoryName;
    private String itemName;

}
