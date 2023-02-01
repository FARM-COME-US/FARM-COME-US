package com.ssafy.farmcu.api.controller;

import com.ssafy.farmcu.api.dto.item.ItemDto;
import com.ssafy.farmcu.api.dto.item.ItemSearchReq;
import com.ssafy.farmcu.api.service.item.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
@Api(value = "상품 관련 API")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    @ApiOperation(value = "상품 등록")
    public ResponseEntity<HashMap<String, Boolean>> createItem(@RequestBody ItemDto itemDto) {
        boolean isSuccess = itemService.saveItem(itemDto);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping()
    @ApiOperation(value = "상품 상세 조회")
    public ResponseEntity<ItemDto> selectItemDetail(Long itemId) {
        return ResponseEntity.ok(itemService.findOne(itemId));
    }

    @PostMapping("/keyword")
    @ApiOperation(value = "상품 목록 조회")
    public ResponseEntity<List<ItemDto>> selectItemList(@RequestBody ItemSearchReq itemSearchReq) {
        return ResponseEntity.ok(itemService.findItemsByCategoryAndItemName(itemSearchReq));
    }

    @DeleteMapping()
    @ApiOperation(value = "상품 삭제")
    public ResponseEntity<HashMap<String, Boolean>> deleteItem(Long itemId) {
        boolean isSuccess = itemService.deleteItem(itemId);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

    @PutMapping()
    @ApiOperation(value = "상품 정보 수정")
    public ResponseEntity<HashMap<String, Boolean>> updateItem(@RequestBody ItemDto itemDto) {
        boolean isSuccess = itemService.updateItem(itemDto);

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

}
