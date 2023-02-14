package com.ssafy.farmcu.api.dto.order;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@Getter @Setter
@ToString
public class CartOrderDto {
    // not null 새로 적용
//    @NotNull
    private Long cartId;

    private List<CartOrderDto> CartOrderDtoList;

}
