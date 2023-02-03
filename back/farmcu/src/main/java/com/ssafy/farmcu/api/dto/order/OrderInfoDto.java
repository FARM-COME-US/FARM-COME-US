package com.ssafy.farmcu.api.dto.order;

<<<<<<< HEAD
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
=======
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

>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
}
