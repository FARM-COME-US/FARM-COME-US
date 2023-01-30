package com.ssafy.farmcu.dto.order;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class OrderDto {
    private Long item_id;

    private Integer oitemCount;
    private List<OrderDto> OrderDtoList;
}
