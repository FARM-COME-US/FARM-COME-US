package com.ssafy.farmcu.api.entity.order.pay;


import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.order.Cart;
import com.ssafy.farmcu.api.entity.store.Item;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class KaKaoPay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String tid;
    @Column
    private Long orderId;
    @Column
    private String  next_redirect_url;

    public static KaKaoPay createPay(String tid, Long orderId, String next_redirect_url){
        KaKaoPay kaKaoPay = new KaKaoPay();
        kaKaoPay.setTid(tid);
        kaKaoPay.setOrderId(orderId);
        kaKaoPay.setNext_redirect_url(next_redirect_url);

        return kaKaoPay;
    }
}
