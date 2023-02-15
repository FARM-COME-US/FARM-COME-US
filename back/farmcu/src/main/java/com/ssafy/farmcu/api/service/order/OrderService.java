package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.OrderDto;
import com.ssafy.farmcu.api.dto.order.OrderInfoDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.OrderItem;

import java.util.List;

public interface OrderService {

    public Long order(OrderInfoDto orderinfoDto);


}
