package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.entity.order.OrderItem;
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

    private List<OrderInfoDto> OrderInfoDtoList;

    private int orderItemCount;

    //
    private Long oitemId;

    private Long orderInfo;

    private LocalDateTime oitemCratedAt;

    private int oitemPrice;

    public OrderInfoDto(OrderItem orderItem) {
        this.oitemId = orderItem.getOitemId();
        this.itemId = orderItem.getItem().getItemId();
        this.orderInfo = getOrderInfo();
        this.orderItemCount = orderItem.getOitemCount();

    }
}
