package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.entity.store.Item;
import com.sun.istack.NotNull;
import lombok.*;

import java.security.Timestamp;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
    @NotNull
    private Long id;
    @NotNull
    private Long item_id;
    @NotNull
    private int orderCount;
    private List<OrderDto> OrderDtoList;
//    private Timestamp orderCreateAt;
}
