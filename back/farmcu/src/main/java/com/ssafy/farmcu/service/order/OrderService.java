package com.ssafy.farmcu.service.order;

import com.ssafy.farmcu.dto.order.OrderDto;
import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.order.Order;
import com.ssafy.farmcu.entity.order.OrderItem;
import com.ssafy.farmcu.entity.store.Item;
import com.ssafy.farmcu.repository.ItemRepository;
import com.ssafy.farmcu.repository.MemberRepository;
import com.ssafy.farmcu.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Component
public class OrderService {

    @Autowired
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;

    // 단일 상품 주문 (한 종류의 상품만 주문 가능, 상품 바로 구매 or live 주문)

    // 다양한 상품 주문 (장바구니 주문)
    public Long orders(List<OrderDto> orderDtoList, String id) {

        // 로그인 중인 사용자
        Member member = memberRepository.findById(id);

        // OrderDto 객체에서 item 객체, count 값을 얻음 =>  OrderItem 객체들 생성
        List<OrderItem> orderItemList = new ArrayList<>();
        for (OrderDto orderDto : orderDtoList) {
            Item item = itemRepository.findByItemId(orderDto.getItem_id()).orElseThrow();
            OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getOrderCount());
            orderItemList.add(orderItem);
        }

        //Order Entity 클래스에 존재하는 createOrder 메소드로 Order 생성 및 저장
        Order order = Order.createOrder(member, orderItemList);
        orderRepository.save(order);
        return order.getOrderId();
    }

}
