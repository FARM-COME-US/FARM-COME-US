package com.ssafy.farmcu.api.dto.store;

import com.ssafy.farmcu.api.entity.live.Live;
import com.ssafy.farmcu.api.entity.member.Member;

import java.sql.Timestamp;

public class StoreCreateReq {
//    private Long storeId; 자동 생성
    private String storeName;
    private String storeDescription;
    private String storeImg;
    private String storeStreetAddr;
    private String storeDetailAddr;
    private String storeZipcode;
    private String storePhoneNumber;
    private int storeDeliveryCost;
    private int storeDeliveryFree;
//    private Timestamp createdAt; 자동생성
    private Long memberId;
}
