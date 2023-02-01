package com.ssafy.farmcu.api.dto.store;

import com.ssafy.farmcu.api.entity.live.Live;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.store.StoreLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreDto {
    //필드
    private String storeName;
    private String storeDescription;
    private String storeImg;
    private String storeStreetAddr;
    private String storeDetailAddr;
    private String storeZipcode;
    private String storePhoneNumber;
    private Integer storeDeliveryCost;
    private Integer storeDeliveryFree;
    private Timestamp createdAt;
    private Live live;
    private Member member;
    private List<StoreLike> storeLike = new ArrayList<>();


}
