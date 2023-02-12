package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.entity.order.OrderItem;
import com.sun.istack.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderInfoDto {

    @NonNull
    private Long itemId;

    @NotNull
    private Long memberId;

    @NotNull
    private int oitemCount;


    private List<OrderInfoDto> OrderInfoDtoList;
}
