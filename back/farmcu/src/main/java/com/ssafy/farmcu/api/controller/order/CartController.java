package com.ssafy.farmcu.api.controller.order;



<<<<<<< HEAD
import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.dto.order.CartOrderDto;
import com.ssafy.farmcu.api.entity.member.Member;
=======
<<<<<<< HEAD
import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.entity.member.Member;
=======
import com.ssafy.farmcu.api.dto.order.CartRequestDto;
import com.ssafy.farmcu.api.dto.order.CartResponseDto;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.dto.store.ItemSearchReq;
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e
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

<<<<<<< HEAD
import java.util.HashMap;
import java.util.List;
=======
<<<<<<< HEAD
import java.util.HashMap;
=======
import java.awt.print.Pageable;
import java.security.Principal;
import java.util.List;
import java.util.Map;
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e

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
<<<<<<< HEAD
        Long cartId;
        try {
            cartId = cartService.addCart(cartDto);

=======

<<<<<<< HEAD
=======
        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }
        String name = principal.getName(); //현재 로그인 정보에서 이름 가져오기
        System.out.println(name);
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1
        Long cartId;

        try {
            cartId = cartService.addCart(cartDto);
            System.out.println(cartId + "장바구니 짝수로 생성 됐다");
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e
        } catch (Exception e) {
            return new ResponseEntity<String>("서버 통신 실패", HttpStatus.BAD_REQUEST);
        }
<<<<<<< HEAD
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

=======
        return new ResponseEntity<String>("장바구니 생성 완료" + cartId, HttpStatus.CREATED);
    }

>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e
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

<<<<<<< HEAD
=======
<<<<<<< HEAD

    @GetMapping("/{memberId}")
    @ApiOperation(value = "장바구니 목록")
    public ResponseEntity<?> findMyCart(@PathVariable Long memberId) {
//        Cart cart = cartService.findMyCart(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

=======
//    @GetMapping("/{memberId}")
//    @ApiOperation(value = "장바구니 목록")
//    public ResponseEntity<?> findMyCart(@PathVariable Long memberId) {
////        Cart cart = cartService.findMyCart(Member.builder().build());
////        Cart.save(cart);
////        List<Cart> carts = cartServiceImpl.findMyCart(memberId);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1

    @GetMapping
    @ApiOperation(value = "장바구니 목록")
    public ResponseEntity findMyCart(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long memberId = principalDetails.getMember().getMemberId();

//        List<CartDto.Response> response = service.findCarts(memberId);

        List<Cart> response = cartService.findMyCart(memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
>>>>>>> 9611c9a0c605f1aa899f830650098fa3282b4b3e

}
