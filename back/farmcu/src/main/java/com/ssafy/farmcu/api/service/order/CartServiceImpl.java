package com.ssafy.farmcu.api.service.order;

<<<<<<< HEAD
import com.ssafy.farmcu.api.dto.member.MemberInfoRes;
import com.ssafy.farmcu.api.dto.order.CartDeleteDto;
import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.dto.order.CartOrderDto;
=======
import com.ssafy.farmcu.api.dto.item.ItemDto;
import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.dto.order.CartInfoDto;
>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
import com.ssafy.farmcu.api.dto.order.OrderInfoDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.entity.store.Category;
import com.ssafy.farmcu.api.entity.store.Item;
<<<<<<< HEAD
import com.ssafy.farmcu.api.repository.CartRepository;
import com.ssafy.farmcu.api.repository.ItemRepository;
import com.ssafy.farmcu.api.repository.MemberRepository;
import org.springframework.context.annotation.Lazy;
=======
import com.ssafy.farmcu.api.entity.store.Store;
import com.ssafy.farmcu.exception.ItemNotFoundException;
import com.ssafy.farmcu.api.repository.CartRepository;
import com.ssafy.farmcu.api.repository.ItemRepository;
import com.ssafy.farmcu.api.repository.MemberRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
<<<<<<< HEAD
public class CartServiceImpl implements CartService {

//    @Autowired
=======
@RequiredArgsConstructor
// @Transactional 사용
public class CartServiceImpl implements CartService{
>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5

    private final CartRepository cartRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
<<<<<<< HEAD


    CartServiceImpl(@Lazy CartRepository cartRepository, @Lazy ItemRepository itemRepository,
                    @Lazy MemberRepository memberRepository) {
        this.cartRepository = cartRepository;
        this.itemRepository = itemRepository;
        this.memberRepository = memberRepository;
    }

//    @Override
//    public void deleteCart(CartDeleteDto cartDeleteDto){
//        cartRepository.deleteById();
//    }

    //** 장바구니 상품 추가 **//
    @Override
    public boolean addCart(CartDto cartDto) {
        try {
            Member member = memberRepository.findById(cartDto.getMemberId()).get();
            Item item = itemRepository.findByItemId(cartDto.getItemId()).get();
            Cart cart = Cart.builder()
                    .cartId(cartDto.getCartId())
                    .getTotalPrice(cartDto.getGetTotalPrice())
                    .cartItemCount(cartDto.getCartItemCount())
                    .item(item)
                    .member(member)
                    .build();
=======
    private final OrderService orderService;

//
//    //** 현재 로그인 한 member 장바구니 조회  **//
//    public List<Cart> findMyCart(Member member) {
//        return cartRepository.findByMember(member);
//    }

     //** 장바구니 상품 추가 **//

    @Override
    public boolean addCart(CartInfoDto cartInfoDto) {
        try {
            Member member = memberRepository.findById(cartInfoDto.getMemberId()).get();
            Item item = itemRepository.findByItemId(cartInfoDto.getItemId()).get();
            Cart cart = Cart.builder()
                    .cartId(cartInfoDto.getCartId())
                    .getTotalPrice(cartInfoDto.getGetTotalPrice())
                    .cartItemCount(cartInfoDto.getCartItemCount())
                    .item(item)
                    .member(member)
                    .build();

>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
            cartRepository.save(cart);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

<<<<<<< HEAD

//
//    public void deleteCart(CartDeleteDto deleteDto, MemberInfoRes memberInfoRes) {
//        try {
//            cartRepository.findByIdAndMemberId(deleteDto.itemIdget, memberInfoRes.getId());
//        } catch (Exception e) {
//            throw new BusinessLogicException(ExceptionCode.CART_NOT_FOUND);
//
//        }
//    }
    // 삭제하려면 ,, cartId 만 갖고 와도 될듯  / memberId 랑 일치하는지 확인

    //    public Long addCart(CartInfoDto cartDto, String Id) {
=======
//    public Long addCart(CartInfoDto cartDto, String Id) {
>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
//        Item item = itemRepository.findById(cartDto.getItemId()).orElseThrow(() -> new ItemNotFoundException("상품에 대한 정보가 없습니다."));
//        Member member = memberRepository.findById(Id).get();
//        //** 장바구니 만들기 **//
//        Cart cart = Cart.createCart(member, item, cartDto.getCartItemCount());
//        cartRepository.save(cart);
//
//        return cart.getCartId();
//    }
//
//    //** 장바구니 상품 주문  **//
<<<<<<< HEAD
    // memberRepository의 id 는 pk 가 아니라 회원가입 아이디
//    public Long orderCart(List<CartOrderDto> cartOrderDtoList, String id) {
//        List<OrderInfoDto> orderInfoDtoList = new ArrayList<>(); //장바구니 리스트
//
//        for (CartOrderDto CartOrderDto : cartOrderDtoList) { //장바구니 항목들 정리
=======
//    //memberRepository의 id 는 pk 가 아니라 회원가입 아이디
//    public Long orderCart(List<CartOrderDto> cartOrderDtoList, String id){
//        List<OrderInfoDto> orderInfoDtoList = new ArrayList<>(); //장바구니 리스트
//
//        for(CartOrderDto CartOrderDto : cartOrderDtoList){ //장바구니 항목들 정리
>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
//            Cart cart = cartRepository.findById(CartOrderDto.getCartId()).orElseThrow();//고객이 담은 장바구니 항목 불러오기
//            OrderInfoDto orderInfoDto = new OrderInfoDto();
//            orderInfoDto.setItemId(cart.getItem().getItemId()); //상품번호
//            orderInfoDto.setOrderItemCount(cart.getCartItemCount()); //수량
//            orderInfoDtoList.add(orderInfoDto);
//        }
//
<<<<<<< HEAD
//        return orderInfoDtoList<Long order>;
//    }
=======
//        // 주문 로직
//        Long orderId = orderService.orders(orderInfoDtoList, id);
//
//
//        //** 주문완료 후 장바구니 삭제 **//
//        for (CartOrderDto cartOrderDto : cartOrderDtoList){
//            Cart cart = cartRepository.findById(cartOrderDto.getCartId()).orElseThrow();
//            cartRepository.delete(cart);
//        }
//        return orderId;
//    }
//
//    //** 장바구니 삭제 **//
//    public void deleteById(Long id) { cartRepository.deleteById(id); }


>>>>>>> 2d99473e31c4dc920fee036e1f2adb0c639f1bf5
}
//
//        // 주문 로직
//        Long orderId = orderService.orders(orderInfoDtoList, id);
//
//
//        //** 주문완료 후 장바구니 삭제 **//
//        for (CartOrderDto cartOrderDto : cartOrderDtoList){
//            Cart cart = cartRepository.findById(cartOrderDto.getCartId()).orElseThrow();
//            cartRepository.delete(cart);
//        }
//        return orderId;
//    }
//
//    //** 장바구니 삭제 **//
//    public void deleteById(Long id) { cartRepository.deleteById(id); }



