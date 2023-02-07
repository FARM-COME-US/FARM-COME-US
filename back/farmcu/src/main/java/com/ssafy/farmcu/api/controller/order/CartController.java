package com.ssafy.farmcu.api.controller.order;



import com.ssafy.farmcu.api.dto.order.CartRequestDto;
import com.ssafy.farmcu.api.dto.order.CartResponseDto;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.dto.store.ItemSearchReq;
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
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.security.Principal;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity saveCart(@RequestBody CartRequestDto cartRequestDto, BindingResult bindingResult, Principal principal) {

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
        Long cartId;
        cartService.addCart(cartRequestDto, name);

        try {
            cartId = cartService.addCart(cartRequestDto, name);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Long>(cartId, HttpStatus.CREATED);
    }


    @DeleteMapping("/{cartId}")
    @ApiOperation(value = "장바구니 상품 삭제")
    public ResponseEntity deleteCart(@PathVariable Long cartId) {
        cartService.deleteCart(cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @GetMapping("/{memberId}")
//    @ApiOperation(value = "장바구니 목록")
//    public ResponseEntity<?> findMyCart(@PathVariable Long memberId) {
////        Cart cart = cartService.findMyCart(Member.builder().build());
////        Cart.save(cart);
////        List<Cart> carts = cartServiceImpl.findMyCart(memberId);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping
    @ApiOperation(value = "장바구니 목록")
    public ResponseEntity findMyCart(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long memberId = principalDetails.getMember().getMemberId();

//        List<CartDto.Response> response = service.findCarts(memberId);

        List<Cart> response = cartService.findMyCart(memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
