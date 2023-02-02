package com.ssafy.farmcu.api.dto.order;

import com.sun.istack.NotNull;
import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderInfoDto {
    @NotNull
    private Long orderId;
    @NotNull
    private Long itemId;
    @NotNull
    private int orderItemCount;
    private List<OrderInfoDto> orderInfoDtoList;

}
