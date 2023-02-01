package com.ssafy.farmcu.dto.order;

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
    @NotNull
    private Long cartId;
    @NotNull
    private Long itemId;
    @NotNull
    private Integer cartItemCount;
    private List<CartOrderDto> CartOrderDtoList;

}
