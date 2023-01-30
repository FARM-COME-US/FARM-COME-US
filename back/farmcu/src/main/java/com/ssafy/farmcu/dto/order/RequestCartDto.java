package com.ssafy.farmcu.dto.order;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.security.Timestamp;

public class RequestCartDto {
    @Getter
    @AllArgsConstructor
    @ToString
    public static class Post {
        @NotNull
        private Long member_id;
        @NotNull
        private Long item_id;
        @NotNull
        private Integer cartItemCount;
    }


}
