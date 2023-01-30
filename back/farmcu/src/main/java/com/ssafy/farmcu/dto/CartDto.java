package com.ssafy.farmcu.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.security.Timestamp;

public class CartDto {
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

    @Getter
    @AllArgsConstructor
    @ToString
    public static class Response {
        private Long cartId;
        private Long item_id;
        private Integer cartItemCount;

    }
}
