package com.ssafy.farmcu.api.controller.live;

import com.ssafy.farmcu.api.dto.live.LiveDetailRes;
import com.ssafy.farmcu.api.dto.live.LiveInsertReq;
import com.ssafy.farmcu.api.dto.live.LiveListRes;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.dto.store.ItemImageDto;
import com.ssafy.farmcu.api.service.live.LiveService;
import com.ssafy.farmcu.api.service.store.ItemImageService;
import com.ssafy.farmcu.api.service.store.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1/live")
@RequiredArgsConstructor
@Api(value = "라이브 관련 API")
public class LiveController {

    private final ItemService itemService;
    private final ItemImageService itemImageService;
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

    @GetMapping("/store")
    @ApiOperation(value = "스토어별 라이브 목록 조회")
    public ResponseEntity<HashMap<String, Object>> selectLiveListByStore(Long storeId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> liveText = liveService.findLivesByStore(storeId, pageRequest);
        List<LiveListRes> liveList = (List<LiveListRes>) liveText.get("liveList");
        Boolean hasNextPage = (Boolean) liveText.get("hasNextPage");

        //라이브 대표 이미지
        List<ItemImageDto> liveImage = new ArrayList<>();
        for (LiveListRes liveListRes : liveList) {
            if(itemImageService.findItemImagesByItemId(liveListRes.getItemId()) != null)
                liveImage.add(itemImageService.findItemImagesByItemId(liveListRes.getItemId()).get(0));
        }

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("storeLiveList", liveList);
        resultMap.put("storeLiveImage", liveImage);
        resultMap.put("hasNextPage", hasNextPage);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/list/on")
    @ApiOperation(value = "라이브 중인 목록 조회")
    public ResponseEntity<HashMap<String, Object>> selectLiveOnList(String liveTitle, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> liveText = liveService.findLivesByLiveTitleLikeAndLiveStartGreaterThanEqualAndLiveEndLessThanEqual(liveTitle, LocalDateTime.now(), LocalDateTime.now(), pageRequest);
        List<LiveListRes> liveList = (List<LiveListRes>) liveText.get("liveList");
        Boolean hasNextPage = (Boolean) liveText.get("hasNextPage");

        //라이브 대표 이미지
        List<ItemImageDto> liveImage = new ArrayList<>();
        for (LiveListRes liveListRes : liveList) {
            if(itemImageService.findItemImagesByItemId(liveListRes.getItemId()) != null)
                liveImage.add(itemImageService.findItemImagesByItemId(liveListRes.getItemId()).get(0));
        }

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("liveOnList", liveList);
        resultMap.put("liveOnImage", liveImage);
        resultMap.put("hasNextPage", hasNextPage);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/list/off")
    @ApiOperation(value = "라이브 예정 목록 조회")
    public ResponseEntity<HashMap<String, Object>> selectLiveOffList(String liveTitle, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> liveText = liveService.findLivesByLiveTitleLikeAndLiveStartLessThan(liveTitle, LocalDateTime.now(), pageRequest);
        List<LiveListRes> liveList = (List<LiveListRes>) liveText.get("liveList");
        Boolean hasNextPage = (Boolean) liveText.get("hasNextPage");

        //라이브 대표 이미지
        List<ItemImageDto> liveImage = new ArrayList<>();
        for (LiveListRes liveListRes : liveList) {
            if(itemImageService.findItemImagesByItemId(liveListRes.getItemId()) != null)
                liveImage.add(itemImageService.findItemImagesByItemId(liveListRes.getItemId()).get(0));
        }

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("liveOffList", liveList);
        resultMap.put("liveOffImage", liveImage);
        resultMap.put("hasNextPage", hasNextPage);

        return ResponseEntity.ok(resultMap);
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
