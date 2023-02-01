package com.ssafy.farmcu.api.dto.order;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter @Setter
@ToString
public class DeliveryInfoDto {
    @NotNull
    private Long deliveryId;
    @NotNull
    private String deliveryName;
    private String deliveryPhoneNumber;
    private String deliveryAddr;

    @NotNull
    private Long MemberId;
    @NotNull
    private Long itemId;

}
