package com.ssafy.farmcu.kakaoPay;


import com.ssafy.farmcu.api.entity.order.Order;
import lombok.*;

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
    private String cid;

    @Column
    private String partner_user_id;

    @Column
    private String  partner_order_id;

    @Column
    private String item_name;

    @Column
    private String quantity;

    @Column
    private String total_amount;

    @Column
    private String tax_free_amount;

    // 결제 대기 - 결제 완료 - 결제 취소/ B = before, A = after
    // 결제 단계 중 하나라도 실패할 시 배송 처리 못 함.

    public enum PayStatus{
        BPAY, PAY, CANCEL
    }

    @Enumerated(EnumType.STRING)
    private PayStatus payStatus  = PayStatus.BPAY;
}
