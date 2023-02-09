package com.ssafy.farmcu.api.controller.order;



import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.service.order.CartService;
import com.ssafy.farmcu.api.service.order.CartServiceImpl;
import com.ssafy.farmcu.api.service.order.OrderServiceImpl;
import com.ssafy.farmcu.oauth.PrincipalDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/cart")
@Component
@Api(value = "장바구니 관련 API")
public class CartController {


    public final  CartService cartService;
    public final CartServiceImpl cartServiceImpl;
    public final OrderServiceImpl orderService;

    CartController(@Lazy CartService cartService,@Lazy OrderServiceImpl orderService, @Lazy CartServiceImpl cartServiceImpl) {
        this.cartService = cartService;
        this.orderService = orderService;
        this.cartServiceImpl = cartServiceImpl;
    }


    @PostMapping
    @ApiOperation(value = "장바구니 생성")
    public ResponseEntity saveCart(@RequestBody CartDto cartDto) {
        Long cartId;
        try {
            cartId = cartService.addCart(cartDto);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(cartId, HttpStatus.CREATED);
    }

    @GetMapping("/{member}")
    @ApiOperation(value = "내 장바구니 목록")
    public ResponseEntity findMyCart(@PathVariable Member member) {

        try {
            List<Cart> cart = cartService.findMyCart(member);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

//        return new ResponseEntity(HttpStatus.OK);
        return new ResponseEntity (HttpStatus.OK);
    }

    @PostMapping(value = "/cart")
    @ApiOperation(value = "장바구니 상품 주문")
    public ResponseEntity cartOrder(@RequestBody CartOrderDto cartOrderDto, String memberId) {
        List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList(); //전달된 장바구니의 항목 리스트

        if (cartOrderDtoList == null || cartOrderDtoList.size() == 0) { //리스트가 비었거나 0개면
            return new ResponseEntity<String>("선택된 상품이 없습니다.", HttpStatus.BAD_REQUEST);
        }
        //주문로직에 장바구니 리스트와 멤버 정보 전달
        Long orderId = cartService.orderCart(cartOrderDtoList, memberId);
        //주문번호 리턴
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    @DeleteMapping("/{cartId}")
    @ApiOperation(value = "장바구니 상품 삭제")
    public ResponseEntity deleteCart(@PathVariable Long cartId) {

        try {
            cartService.deleteCart(cartId);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
