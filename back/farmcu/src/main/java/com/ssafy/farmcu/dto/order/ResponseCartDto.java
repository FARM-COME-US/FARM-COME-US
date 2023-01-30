package com.ssafy.farmcu.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

public class ResponseCartDto {

    @Getter
    @AllArgsConstructor
    @ToString
    public static class Response {
        private Long cartId;
        private Long item_id;
        private Integer cartItemCount;

    }
}
