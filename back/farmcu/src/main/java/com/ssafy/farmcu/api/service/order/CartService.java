package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.item.ItemDto;
import com.ssafy.farmcu.api.dto.order.CartInfoDto;

public interface CartService {

    //상품 생성
    public boolean addCart(CartInfoDto cartInfoDto);
}
