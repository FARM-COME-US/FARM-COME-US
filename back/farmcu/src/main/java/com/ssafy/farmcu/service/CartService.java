package com.ssafy.farmcu.service;

import com.ssafy.farmcu.dto.CartDto;
import com.ssafy.farmcu.entity.order.Cart;
import com.ssafy.farmcu.entity.store.Item;
import com.ssafy.farmcu.repository.CartRepository;
import com.ssafy.farmcu.repository.ItemRepository;
import com.ssafy.farmcu.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

// @Transactional 사용해서 item 이 품절되거나 삭제 되었을 경우 진행하던 작업 원상복귀 처리 =====> 나중에 구현
public class CartService {
    private final CartRepository cartRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;



    // 카트 삭제
    public void deleteCart(long cartId) { cartRepository.deleteById(cartId); }

}
