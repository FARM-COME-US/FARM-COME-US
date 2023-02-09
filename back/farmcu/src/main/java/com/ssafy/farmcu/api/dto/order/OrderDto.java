package com.ssafy.farmcu.api.dto.order;

import com.sun.istack.NotNull;
import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {

    @NotNull
    private Long item_id;
    @NotNull
    private Long member_id;
    @NotNull
    private int orderCount;

    private List<OrderDto> OrderDtoList;
//    private Timestamp orderCreateAt;
}
