package com.ssafy.farmcu.api.dto.order;

import com.ssafy.farmcu.api.entity.order.OrderItem;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderInfoDto {
    private Long oitemId;
    private Long itemId;
    private Long orderInfo;

    private int orderItemCount;
    private LocalDateTime oitemCratedAt;
    private int oitemPrice;

    public OrderInfoDto(OrderItem orderItem) {
        this.oitemId = orderItem.getOitemId();
        this.itemId = orderItem.getItem().getItemId();
        this.orderInfo = getOrderInfo();
        this.orderItemCount = orderItem.getOitemCount();

    }
}
