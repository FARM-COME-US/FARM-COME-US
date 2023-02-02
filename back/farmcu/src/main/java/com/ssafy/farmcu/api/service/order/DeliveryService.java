package com.ssafy.farmcu.api.service.order;

import com.ssafy.farmcu.api.dto.order.DeliveryInfoDto;

public interface DeliveryService {

    //** 배송 정보 작성 **//
    boolean saveDelivery(DeliveryInfoDto deliveryInfoDto, Long Id);

    //** 배송 정보 수정 **//
    boolean updateDelivery(DeliveryInfoDto deliveryInfoDto, Long Id);


}
