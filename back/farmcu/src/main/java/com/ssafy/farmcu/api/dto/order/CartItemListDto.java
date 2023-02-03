package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.dto.store.StoreDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemListDto {

    private Long memberId;
    private StoreDto storeDto;

}
