package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.CartAddDto;
import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.dto.store.ItemDto;
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
import java.util.Optional;

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
    public Long addCart(CartDto cartDto) {

        Member member = memberRepository.findById(cartDto.getMemberId()).get();
        Item item = itemRepository.findByItemId(cartDto.getItemId()).get();

        Cart cart = Cart.createCart(member, item, cartDto.getCartItemCount());
        cartRepository.save(cart);

        return cart.getCartId();

    }

    public List<Cart> findMyCart(Member member) {
        return cartRepository.findByMember(member);
    }

    @Override
    public void deleteCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).get();
        cartRepository.delete(cart);
    }

}


