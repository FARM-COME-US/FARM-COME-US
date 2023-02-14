package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.OrderDto;
import com.ssafy.farmcu.api.dto.order.OrderInfoDto;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.entity.order.Order;
import com.ssafy.farmcu.api.entity.order.OrderItem;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.Store;
import com.ssafy.farmcu.api.repository.*;
import com.ssafy.farmcu.exception.ItemNotFoundException;
import com.ssafy.farmcu.exception.NotFoundUserException;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Component // 왜 있는지 모르겠어
public class OrderServiceImpl implements OrderService{

    //    @Autowired
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final OrderItemRepository orderItemRepository;

    @Lazy
    OrderServiceImpl(ItemRepository itemRepository, OrderItemRepository orderItemRepository,
                     MemberRepository memberRepository, OrderRepository orderRepository) {
        this.orderItemRepository = orderItemRepository;
        this.itemRepository = itemRepository;
        this.memberRepository = memberRepository;
        this.orderRepository = orderRepository;
    }

    //**  단일 상품 주문 **//
    // (한 종류의 상품만 주문 가능, 상품 바로 구매 or live 주문)
    @Transactional
    public Long order(OrderInfoDto orderinfoDto) {

        Item item = itemRepository.findByItemId(orderinfoDto.getItemId()).orElseThrow(() -> new ItemNotFoundException("상품에 대한 정보가 없습니다."));
        Member member = memberRepository.findById(orderinfoDto.getMemberId()).orElseThrow(() -> new NotFoundUserException("사용자애 대한 정보가 없습니다."));
        List<OrderItem> orderItems = new ArrayList<>();

        OrderItem orderItem = OrderItem.createOrderItem(item, orderinfoDto.getOitemCount());
        orderItems.add(orderItem);
        Order order = Order.createOrder(member, orderItems);
        orderRepository.save(order);

        //OrderItem Entity 클래스에 존재하는 createOrder 메소드로 Order 생성 및 저장
        orderItem.addOrderNum(order);
        orderItemRepository.save(orderItem);

        return order.getOrderId();

    }

    // 다양한 종류의 상품 주문 (장바구니)
    public Long orders(List<OrderInfoDto> orderInfoDtoList, String memberId) {

        Member member = memberRepository.findById(memberId).get();
        List<OrderItem> orderItemList = new ArrayList<>();
        for (OrderInfoDto orderInfoDto : orderInfoDtoList) {
            Item item = itemRepository.findByItemId(orderInfoDto.getItemId()).orElseThrow();
            OrderItem orderItem = OrderItem.createOrderItem(item, orderInfoDto.getOitemCount());
            orderItemList.add(orderItem);
        }

        //Order Entity 클래스에 존재하는 createOrder 메소드로 Order 생성 및 저장
        Order order = Order.createOrder(member, orderItemList);
        orderRepository.save(order);
        return order.getOrderId();
    }

    // 주문 취소
    @Transactional
    public void updateOrder(Long orderId) {

        Order order = orderRepository.findByOrderId(orderId).orElseThrow(EntityNotFoundException::new);
        String status = String.valueOf(order.getOrderStatus());

        if ( "ORDER".equals(status) ) {
            order.updateOrder();
        }
    }

    // 내 주문 목록 조회
    @Transactional
    public List<Order> findMyOrder(Member member) {
        try {
            return orderRepository.findByMember(member);
        } catch (Exception e ){
            return null;
        }
    }

    //  주문 상세 조회
    @Transactional
    public List<OrderItem> findOrderDetail(Order order) {
        try {
            return orderItemRepository.findByOrder(order);
        } catch (Exception e ){
            return null;
        }
    }

    // 스토어 주문 목록 조회
    @Transactional
    public List<OrderItem> findStoreOrder(Long storeNum) {
        try {
            return orderItemRepository.findByStoreNum(storeNum);
        } catch (Exception e ){
            return null;
        }
    }

    // 전체 주문 상품 조회
    public List<OrderItem> findAllOrderItem() {
        return orderItemRepository.findAll();
    }

    // 전체 주문 조회
    public List<Order> findAllOrder() {
        return orderRepository.findAll();
    }

}
