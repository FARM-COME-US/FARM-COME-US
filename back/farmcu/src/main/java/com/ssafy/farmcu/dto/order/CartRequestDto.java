package com.ssafy.farmcu.dto.order;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.security.Timestamp;

@Getter @Setter
@AllArgsConstructor
@ToString
public class CartRequestDto {

    @NotNull
    private Long memberId;
    @NotNull
    private Long itemId;
    @NotNull
    private Integer cartItemCount;

}
