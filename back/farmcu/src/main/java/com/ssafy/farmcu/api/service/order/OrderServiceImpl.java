//package com.ssafy.farmcu.api.service.order;
//
//import com.ssafy.farmcu.api.dto.order.OrderDto;
//import com.ssafy.farmcu.api.entity.member.Member;
//import com.ssafy.farmcu.api.entity.order.Order;
//import com.ssafy.farmcu.api.entity.order.OrderItem;
//import com.ssafy.farmcu.api.entity.store.Item;
//import com.ssafy.farmcu.exception.ItemNotFoundException;
//import com.ssafy.farmcu.api.repository.ItemRepository;
//import com.ssafy.farmcu.api.repository.MemberRepository;
//import com.ssafy.farmcu.api.repository.OrderItemRepository;
//import com.ssafy.farmcu.api.repository.OrderRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import javax.persistence.EntityNotFoundException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@RequiredArgsConstructor
//@Service
//@Component
//public class OrderServiceImpl implements OrderService {
//
//    @Autowired
//    private final OrderRepository orderRepository;
//    private final MemberRepository memberRepository;
//    private final ItemRepository itemRepository;
//    private final OrderItemRepository orderItemRepository;
//
//    //**  단일 상품 주문 **//
//    // (한 종류의 상품만 주문 가능, 상품 바로 구매 or live 주문)
//    public Long order(OrderDto orderDto, String id) {
//        Item item = itemRepository.findByItemId(orderDto.getItem_id()).orElseThrow(() -> new ItemNotFoundException("상품에 대한 정보가 없습니다."));
//
//        // 로그인 중인 사용자
//        Member member = memberRepository.findById(id).get();
//        // item 객체에서 OrderItem 객체 생성
//        List<OrderItem> orderItems = new ArrayList<>();
//        OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getOrderCount());
//        orderItems.add(orderItem);
//        Order order = Order.createOrder(member, orderItems);
//        orderRepository.save(order);
//
//        //OrderItem Entity 클래스에 존재하는 createOrder 메소드로 Order 생성 및 저장
//        orderItem.addOrderNum(order);
//        orderItemRepository.save(orderItem);
//
//        return order.getOrderId();
//    }
//
//    //** 다양한 상품 주문 **//
//    // (장바구니 주문)
//    public Long orders(List<OrderDto> orderDtoList, String id) {
//
//        // 로그인 중인 사용자
//        Member member = memberRepository.findById(id).get();
//
//        // OrderDto 객체에서 item 객체, count 값을 얻음 =>  OrderItem 객체들 생성해서 추가
//        List<OrderItem> orderItemList = new ArrayList<>();
//        for (OrderDto orderDto : orderDtoList) {
//            Item item = itemRepository.findByItemId(orderDto.getItem_id()).orElseThrow();
//            OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getOrderCount());
//            orderItemList.add(orderItem);
//        }
//
//        //Order Entity 클래스에 존재하는 createOrder 메소드로 Order 생성 및 저장
//        Order order = Order.createOrder(member, orderItemList);
//        orderRepository.save(order);
//        return order.getOrderId();
//    }
//
//    //** 주문 취소 **//
//    // controller 에서 작성
//    public void updateOrder(Long orderId){
//        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
//        order.updateOrder();
//    }
//
//    //** 전체 주문 조회 **//
//    public List<Order> findAll() {
//        return orderRepository.findAll();
//    }
//
//    //** 전체 주문 상세 조회 **//
//    public List<OrderItem> findAllItems() {
//        return orderItemRepository.findAll();
//    }
//
//    //** 나의 주문 조회 **//
//    public List<OrderItem> findMyItems(Member member){
//        return orderItemRepository.findByOrderMember(member);
//    }
//    //** 주문 번호 조회 **//
//    public Optional<Order> findById(Long order_num) {
//        return orderRepository.findById(order_num);
//    }
//}
