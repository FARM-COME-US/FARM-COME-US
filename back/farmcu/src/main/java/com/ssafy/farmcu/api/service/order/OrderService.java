package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.OrderDto;

import java.util.List;

public interface OrderService {

    // 단일 상품 주문
    public Long order(OrderDto orderDto, String id);

    // 장바구니 항목 주문
    public Long orders(List<OrderDto> orderDtoList, String id);

    // 주문 목록 조회
    // public List<Order> findAll()
    // 일단 controller에서 orderServiceImpl로 바로 요청

    // 주문 취소
    public void updateOrder(Long orderId);


}
