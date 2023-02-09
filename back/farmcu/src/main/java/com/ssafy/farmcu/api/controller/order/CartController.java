package com.ssafy.farmcu.api.controller.order;



import com.ssafy.farmcu.api.dto.order.CartDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.service.order.CartService;
import com.ssafy.farmcu.api.service.order.CartServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

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
        Long cartId;
        cartService.addCart(cartDto);
        try {
            cartId = cartService.addCart(cartDto);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Long>(cartId, HttpStatus.CREATED);
    }

    @DeleteMapping("/{cartId}")
    @ApiOperation(value = "장바구니 상품 삭제")
    public ResponseEntity deleteCart(@PathVariable Long cartId) {
        cartService.deleteCart(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/{memberId}")
    @ApiOperation(value = "장바구니 목록")
    public ResponseEntity<?> findMyCart(@PathVariable Long memberId) {
//        Cart cart = cartService.findMyCart(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
