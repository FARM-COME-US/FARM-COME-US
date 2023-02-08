package com.ssafy.farmcu.api.controller.order;



<<<<<<< HEAD
import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.entity.member.Member;
=======
import com.ssafy.farmcu.api.dto.order.CartRequestDto;
import com.ssafy.farmcu.api.dto.order.CartResponseDto;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.dto.store.ItemSearchReq;
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.service.order.CartService;
import com.ssafy.farmcu.api.service.order.CartServiceImpl;
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
=======
import java.awt.print.Pageable;
import java.security.Principal;
import java.util.List;
import java.util.Map;
>>>>>>> 014bbd1cb2f680038671ebd07db13bc520e70eb1

//@RequiredArgsConstructor
@RestController
@RequestMapping("/cart")
@Component
@Api(value = "장바구니 관련 API")
public class CartController {


    //    @Autowired
    public final  CartService cartService;
    public final CartServiceImpl cartServiceImpl;

    CartController(@Lazy CartService cartService, @Lazy CartServiceImpl cartServiceImpl) {
        this.cartService = cartService;
        this.cartServiceImpl = cartServiceImpl;
    }

    //    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(CartController.class);
//    CartService cartService = applicationContext.getBean("cartService", CartService.class);

    @PostMapping
    @ApiOperation(value = "장바구니 생성")
    public ResponseEntity saveCart(@RequestBody CartDto cartDto) {

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
        } catch (Exception e) {
            return new ResponseEntity<String>("서버 통신 실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("장바구니 생성 완료" + cartId, HttpStatus.CREATED);
    }

    @DeleteMapping("/{cartId}")
    @ApiOperation(value = "장바구니 상품 삭제")
    public ResponseEntity deleteCart(@PathVariable Long cartId) {
        cartService.deleteCart(cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

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

}
