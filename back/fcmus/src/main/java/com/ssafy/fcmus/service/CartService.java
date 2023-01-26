package com.ssafy.fcmus.service;

import com.ssafy.fcmus.dto.CartInfoDto;
import com.ssafy.fcmus.entity.member.Member;
import com.ssafy.fcmus.entity.order.Cart;
import com.ssafy.fcmus.entity.store.Item;
import com.ssafy.fcmus.repository.CartRepository;
import com.ssafy.fcmus.repository.ItemRepository;
import com.ssafy.fcmus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
// 초기화 되지 않은 final 이나 @NonNull이 붙은 필드에 대해 생성자를 생성
// Autowired 어노테이션 없이도 의존성 주입이 가능

@RequiredArgsConstructor
public class CartService {

    @Autowired
//    private final MemberRepository memberRepository;
//    private final ItemRepository itemRepository;
    private  final CartRepository cartRepository;


    // add
//    public Long addCart(CartInfoDto infoDto, String username) {
//        Item item = itemRepository.findById(infoDto.getItem()).orElseThrow(() -> new ProductNotFoundException("오류: 상품 정보가 없습니다."));
//        Member member = memberRepository.findByMmebername(username).orElseThrow(() -> new UsernameNotFoundException(username));
//        Cart cart = Cart.createCart(member, item ); //장바구니 생성
//        cartRepository.save(cart);
//
//        return cart.getId();
//    }


     // delete
    public void deleteById(Long id) {
        cartRepository.deleteById(id);
    }
}
