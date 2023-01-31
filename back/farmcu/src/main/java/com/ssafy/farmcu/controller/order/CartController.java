package com.ssafy.farmcu.controller.order;


import com.ssafy.farmcu.service.order.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/cart")

public class CartController {
    @Autowired
    private final CartService cartService;

    // Controller method
    //
    //- create ex) createItem
    //- select ex) selectMember (조회)
    //- 7update ex) updateMemberInfo (업데이트)
    //- Delete ex) deleteMember (삭제)


}
