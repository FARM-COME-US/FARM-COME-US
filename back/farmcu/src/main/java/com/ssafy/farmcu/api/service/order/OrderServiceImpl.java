package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.OrderDto;
import com.ssafy.farmcu.api.dto.order.OrderInfoDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Order;
import com.ssafy.farmcu.api.entity.order.OrderItem;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.repository.ItemRepository;
import com.ssafy.farmcu.api.repository.MemberRepository;
import com.ssafy.farmcu.api.repository.OrderItemRepository;
import com.ssafy.farmcu.api.repository.OrderRepository;
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

    //** 다양한 상품 주문 **//
    // (장바구니 주문)
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

    //** 주문 취소 **//
    // controller 에서 작성
    public void updateOrder(Long orderId){
        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
        order.updateOrder();
    }

    //** 전체 목록 상세 조회 **//
    public List<OrderItem> findOrderDetail(Member member) {
        return orderItemRepository.findByOrOrderInfoMember(member);
    }

    //** 전체 주문 상세 조회 **//
    public List<OrderItem> findAllItems() {
        return orderItemRepository.findAll();
    }

    //** 나의 주문 조회 **//
    public List<Order> findMyOrders(Member member) {
        return orderRepository.findByMember(member);
    }

    //** 주문 번호 별 주문 조회
    public List<Order> findSameOrder(Order order) {
        return orderRepository.findByOrderId(order);
    }
//    public List<OrderItem> findMyDetails(Long num)
//        return orderRepository.findById(num);
//    }

    //** 주문 번호 조회 **//
//    public Optional<Order> findById(Long order_num) {
//        return orderRepository.findById(order_num);
//    }


}
