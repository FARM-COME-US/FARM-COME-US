package com.ssafy.farmcu.api.dto.order;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class OrderDto {
    @NotNull
    private Long item_id;
    @NotNull
    private int orderCount;
    private List<OrderDto> OrderDtoList;
}
