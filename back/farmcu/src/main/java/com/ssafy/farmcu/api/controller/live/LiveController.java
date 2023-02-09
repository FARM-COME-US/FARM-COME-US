package com.ssafy.farmcu.api.controller.live;

import com.ssafy.farmcu.api.dto.live.LiveDetailRes;
import com.ssafy.farmcu.api.dto.live.LiveInsertReq;
import com.ssafy.farmcu.api.dto.live.LiveListRes;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.service.live.LiveService;
import com.ssafy.farmcu.api.service.store.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1/live")
@RequiredArgsConstructor
@Api(value = "라이브 관련 API")
public class LiveController {

    private final ItemService itemService;
    private final LiveService liveService;

    @PostMapping
    @ApiOperation(value = "라이브 등록")
    public ResponseEntity<HashMap<String, Boolean>> createLive(@RequestBody LiveInsertReq liveInsertReq) {
        boolean isSuccess = liveService.saveLive(liveInsertReq);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/list")
    @ApiOperation(value = "라이브 목록 조회")
    public ResponseEntity<List<LiveListRes>> selectLiveList(String liveTitle) {
        return ResponseEntity.ok(liveService.findLivesByLiveTitleLike(liveTitle));
    }

    @GetMapping
    @ApiOperation(value = "라이브 상세 조회")
    public ResponseEntity<LiveDetailRes> selectLiveDetail(Long LiveId) {
        return ResponseEntity.ok(liveService.findOne(LiveId));
    }

    @PutMapping
    @ApiOperation(value = "라이브 수정")
    public ResponseEntity<HashMap<String, Boolean>> updateLive(@RequestBody LiveInsertReq liveInsertReq) {
        boolean isSuccess = liveService.updateLive(liveInsertReq);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping
    @ApiOperation(value = "라이브 삭제")
    public ResponseEntity<HashMap<String, Boolean>> deleteLive(Long liveId) {
        boolean isSuccess = liveService.deleteLive(liveId);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/discount")
    @ApiOperation(value = "라이브 시작, 종료 시 일반 상품 할인률 업데이트)")
    public ResponseEntity<HashMap<String, Boolean>> updateItemDiscount(Long itemId, int itemDiscount) {
        ItemDto itemDto = itemService.findOne(itemId);
        itemDto.setItemDiscount(itemDiscount);
        boolean isSuccess = itemService.updateItem(itemDto);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("seccess", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

}
