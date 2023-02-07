package com.ssafy.farmcu.api.entity.order.pay;


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
}
