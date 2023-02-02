package com.ssafy.farmcu.api.entity.live;

import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.Store;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "live")
public class Live {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long liveId;

    @Column
    private int liveDiscount;

    @Column
    private int liveViewers;

    @Column(nullable = false)
    private LocalDateTime liveStart;

    @Column
    private LocalDateTime liveEnd;

    //연결
    @OneToOne
    @JoinColumn(name="item_id")
    private Item item;

    @OneToOne
    @JoinColumn(name="store_id")
    private Store store;

    //빌더
    @Builder
    public Live(Long liveId, int liveDiscount, int liveViewers, LocalDateTime liveStart, LocalDateTime liveEnd) {
        this.liveId = liveId;
        this.liveDiscount = liveDiscount;
        this.liveViewers = liveViewers;
        this.liveStart = liveStart;
        this.liveEnd = liveEnd;
    }

}