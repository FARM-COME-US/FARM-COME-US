package com.ssafy.farmcu.entity.live;


import com.ssafy.farmcu.entity.store.Item;
import com.ssafy.farmcu.entity.store.Store;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "live")
public class Live {

    //필드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id", unique = true, nullable = false)
    private Long live_id;

    @Column(nullable = false)
    private Integer live_discount;

    @Column
    private Integer live_viewers;

    @Column
    private LocalDateTime live_start;

    @Column
    private LocalDateTime live_end;

    // 왜래 키

    @OneToOne
    @JoinColumn(name="item_id")
    private Item item;

    @OneToOne
    @JoinColumn(name="store_id")
    private Store store;

    //빌더
    @Builder
    public Live(Long live_id,Integer live_discount, Integer live_views, LocalDateTime live_start, LocalDateTime live_end ) {
        this.live_id = live_id;
        this.live_start = live_start;
        this.live_end = live_end;
        this.live_discount = live_discount;
        this.live_viewers = live_views;

    }
}