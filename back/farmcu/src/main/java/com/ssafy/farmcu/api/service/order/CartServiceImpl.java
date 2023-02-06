package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.dto.order.CartRequestDto;
import com.ssafy.farmcu.api.dto.order.OrderInfoDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.repository.CartRepository;
import com.ssafy.farmcu.api.repository.ItemRepository;
import com.ssafy.farmcu.api.repository.MemberRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

//    @Autowired

    private final CartRepository cartRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;


    CartServiceImpl(@Lazy CartRepository cartRepository, @Lazy ItemRepository itemRepository,
                    @Lazy MemberRepository memberRepository) {
        this.cartRepository = cartRepository;
        this.itemRepository = itemRepository;
        this.memberRepository = memberRepository;
    }

    //** 장바구니 상품 추가 **//
    @Override
    public Long addCart(CartRequestDto cartRequestDto, String name) {

        Member member = memberRepository.findById(name).get();
        Item item = itemRepository.findByItemId(cartRequestDto.getItemId()).get();

        Cart cart = Cart.createCart(member, item, cartRequestDto.getCartItemCount());
        cartRepository.save(cart);

        return cart.getCartId();

    }

    //** 장바구니 상품 주문 **//
    public Long orderCart(List<CartOrderDto> cartOrderDtoList, String name){
        List<OrderInfoDto> orderInfoDtoList = new ArrayList<>(); //장바구니 리스트

        for(CartOrderDto CartOrderDto : cartOrderDtoList){ //장바구니 항목들 정리
            Cart cart = cartRepository.findById(CartOrderDto.getCartId()).orElseThrow();//고객이 담은 장바구니 항목 불러오기
            OrderInfoDto orderInfoDto = new OrderInfoDto();
            orderInfoDto.setItemId(cart.getItem().getItemId()); //상품번호
            orderInfoDto.setOrderItemCount(cart.getCartItemCount()); // 주문 수량

            orderInfoDtoList.add(orderInfoDto);
        }

//        //주문 로직
//        Long orderId = orderService.orders(orderInfoDtoList, username);
//
//        //주문완료 후 장바구니 삭제
//        for (CartOrderDto cartOrderDto : cartOrderDtoList){
//            Cart cart = cartRepository.findById(cartOrderDto.getCart_num()).orElseThrow();
//            cartRepository.delete(cart);
//        }
//        return orderId;
    }

    //** 장바구니 조회 **//
    @Override
    public List<Cart> findMyCart(Member member) {
        return cartRepository.findByMember(member);
    }

    //** 장바구니 삭제 **//
    @Override
    public void deleteCart(Long cartId) {
//        Cart cart = cartRepository.findById(cartId).get();
//        cartRepository.delete(cart);

        cartRepository.deleteByCartId(cartId);
    }

}


