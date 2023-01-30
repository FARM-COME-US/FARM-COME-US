package com.ssafy.farmcu.service.order;

import com.ssafy.farmcu.dto.order.RequestCartDto;
import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.entity.order.Cart;
import com.ssafy.farmcu.entity.store.Item;
import com.ssafy.farmcu.repository.CartRepository;
import com.ssafy.farmcu.repository.ItemRepository;
import com.ssafy.farmcu.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Component

// @Transactional 사용해서 item 이 품절되거나 삭제 되었을 경우 진행하던 작업 원상복귀 처리 =====> 나중에 구현
public class CartService {

    @Autowired
    private final CartRepository cartRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;

     // 장바구니 상품 추가
    public Long addCart(RequestCartDto cartDto, String Id) {
        Item item = itemRepository.findById(cartDto.getItemId()).orElseThrow(() -> new ProductNotFoundException("오류: 상품 정보가 없습니다."));;
        Member member = memberRepository.findById(Id);

        // 장바구니 만들기
        Cart cart = Cart.createCart(member, item, cartDto.getCartItemCount());
        cartRepository.save(cart);

        return cart.getCartId();

    }

    // 현재 로그인 한 member 장바구니 조회
    public List<Cart> findMemberCart(Member member) {
        return cartRepository.findByMember(member);
    }
    // 장바구니 삭제
    public void deleteCart(long cartId) { cartRepository.deleteById(cartId); }

}
