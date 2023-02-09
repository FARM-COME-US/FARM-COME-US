package com.ssafy.farmcu.api.dto.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KaKaoPayDTO {

    public String memberId;
    public String orderId;
    public String itemName;
    public String quantity;
    public String totalAmount;
    public String tax;

}
