package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.item.ItemDto;
import com.ssafy.farmcu.api.dto.order.DeliveryInfoDto;
import com.ssafy.farmcu.api.dto.order.OrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.DeliveryInfo;
import com.ssafy.farmcu.api.entity.order.Order;
import com.ssafy.farmcu.api.entity.order.OrderItem;
import com.ssafy.farmcu.api.entity.store.Category;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.Store;
import com.ssafy.farmcu.api.repository.DeliveryInfoRepository;
import com.ssafy.farmcu.api.repository.ItemRepository;
import com.ssafy.farmcu.api.repository.MemberRepository;
import com.ssafy.farmcu.api.repository.OrderRepository;
import com.ssafy.farmcu.exception.ItemNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {

    //** 주문 시 배송 정보 생성 **// ===> 기본 배송 정보는 로그인 한 사용자
//    @Autowired
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;
    private final DeliveryInfoRepository deliveryInfoRepository;

    //** 배송 정보 작성 **//
    @Override
    public boolean saveDelivery(DeliveryInfoDto deliveryInfoDto, Long Id) {
        try {
            Order order = orderRepository.findById(Id).get();
            DeliveryInfo deliveryInfo = DeliveryInfo.builder()
                    .deliveryId(deliveryInfoDto.getDeliveryId())
                    .deliveryName(deliveryInfoDto.getDeliveryName())
                    .deliveryAddr(deliveryInfoDto.getDeliveryAddr())
                    .deliveryPhoneNumber(deliveryInfoDto.getDeliveryPhoneNumber())
                    .order(order)
                    .build();
            deliveryInfoRepository.save(deliveryInfo);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //** 배송 정보 수정 **//
    @Override
    public boolean updateDelivery(DeliveryInfoDto deliveryInfoDto, Long Id) {
        try {
            Order order = orderRepository.findById(Id).get();
            DeliveryInfo deliveryInfo = DeliveryInfo.builder()
                    .deliveryId(deliveryInfoDto.getDeliveryId())
                    .deliveryName(deliveryInfoDto.getDeliveryName())
                    .deliveryAddr(deliveryInfoDto.getDeliveryAddr())
                    .deliveryPhoneNumber(deliveryInfoDto.getDeliveryPhoneNumber())
                    .order(order)
                    .build();
            deliveryInfoRepository.save(deliveryInfo);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}