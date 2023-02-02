package com.ssafy.farmcu.api.controller.order;


import com.ssafy.farmcu.api.dto.item.ItemDto;
import com.ssafy.farmcu.api.dto.order.CartInfoDto;
import com.ssafy.farmcu.api.service.order.CartService;
import com.ssafy.farmcu.api.service.order.CartServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/cart")
@Component
public class CartController {

//    private final CartService cartService;
//
//    public CartController(CartService cartService) {
//        this.cartService = cartService;
//    }

//    @Autowired
    public final  CartService cartService;

    CartController(@Lazy CartService cartService) {
        this.cartService = cartService;
    }

    //    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(CartController.class);
//    CartService cartService = applicationContext.getBean("cartService", CartService.class);
    @PostMapping
    @ApiOperation(value = "장바구니 추가")
    public ResponseEntity<HashMap<String, Boolean>> saveCart(@RequestBody CartInfoDto cartInfoDto) {
        boolean isSuccess = cartService.addCart(cartInfoDto);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

}
