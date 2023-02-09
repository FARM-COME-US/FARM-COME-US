package com.ssafy.farmcu.api.controller.store;

import com.ssafy.farmcu.api.dto.store.CategoryDto;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.dto.store.ItemImageDto;
import com.ssafy.farmcu.api.dto.store.ItemSearchReq;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.service.image.S3Service;
import com.ssafy.farmcu.api.service.store.CategoryService;
import com.ssafy.farmcu.api.service.store.ItemImageService;
import com.ssafy.farmcu.api.service.store.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("api/v1/item")
@RequiredArgsConstructor
@Api(value = "상품 관련 API")
public class ItemController {

    private final CategoryService categoryService;
    private final ItemService itemService;
    private final ItemImageService itemImageService;
    private final S3Service s3Service;

    @GetMapping("/title")
    @ApiOperation(value = "부류 목록")
    public ResponseEntity<List<CategoryDto>> selectTitles() {
        return ResponseEntity.ok(categoryService.findTitles());
    }

    @GetMapping("/detail")
    @ApiOperation(value = "품목 목록")
    public ResponseEntity<List<CategoryDto>> selectDetails(String titleName) {
        return ResponseEntity.ok(categoryService.findDetails(titleName));
    }

    @PostMapping
    @ApiOperation(value = "상품 등록")
    public ResponseEntity<HashMap<String, Boolean>> createItem(ItemDto itemDto, MultipartFile[] uploadFile) throws Exception {
        Long itemId = itemService.saveItem(itemDto);

        //이미지 첨부
        if(itemId > 0L && uploadFile != null) {
            for(MultipartFile file : uploadFile) {
                String savedPath = s3Service.uploadFile(file);

                ItemImageDto itemImageDto = ItemImageDto.builder()
                        .itemId(itemDto.getItemId())
                        .originalName(file.getOriginalFilename())
                        .savedPath(savedPath).build();

                itemImageService.saveItemImage(itemImageDto);
            }
        }

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(itemId > 0L) resultMap.put("success", true);
        else resultMap.put("success", false);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping()
    @ApiOperation(value = "상품 상세 조회")
    public ResponseEntity<HashMap<String, Object>> selectItemDetail(Long itemId) {
        ItemDto itemDto = itemService.findOne(itemId);
        List<ItemImageDto> itemImageDtos = itemImageService.findItemImagesByItemId(itemId);

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("item", itemDto);
        resultMap.put("itemImage", itemImageDtos);

        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/keyword")
    @ApiOperation(value = "상품 목록 조회")
    public ResponseEntity<HashMap<String, Object>> selectItemList(@RequestBody ItemSearchReq itemSearchReq) {
        HashMap<String, Object> itemText = itemService.findItemsByCategoryAndItemNameLike(itemSearchReq);
        List<ItemDto> itemList = (List<ItemDto>) itemText.get("itemList");
        Boolean hasNextPage = (Boolean) itemText.get("hasNextPage");

        //상품 대표 이미지
        List<ItemImageDto> itemImage = new ArrayList<>();
        for(ItemDto itemDto : itemList) {
            if(itemImageService.findItemImagesByItemId(itemDto.getItemId()) != null)
                itemImage.add(itemImageService.findItemImagesByItemId(itemDto.getItemId()).get(0));
        }

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("itemList", itemList);
        resultMap.put("itemImage", itemImage);
        resultMap.put("hasNextPage", hasNextPage);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/store")
    @ApiOperation(value = "스토어 상품 목록 조회")
    public ResponseEntity<HashMap<String, Object>> selectStoreItemList(Long storeId) {
        HashMap<String, Object> itemText = itemService.findItemsByStore(storeId);
        List<ItemDto> itemList = (List<ItemDto>) itemText.get("itemList");
        Boolean hasNextPage = (Boolean) itemText.get("hasNextPage");

        //상품 대표 이미지
        List<ItemImageDto> itemImage = new ArrayList<>();
        for(ItemDto itemDto : itemList) {
            if(itemImageService.findItemImagesByItemId(itemDto.getItemId()) != null)
                itemImage.add(itemImageService.findItemImagesByItemId(itemDto.getItemId()).get(0));
        }

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("itemList", itemList);
        resultMap.put("itemImage", itemImage);
        resultMap.put("hasNextPage", hasNextPage);

        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping()
    @ApiOperation(value = "상품 삭제")
    public ResponseEntity<HashMap<String, Boolean>> deleteItem(Long itemId) {
        HashMap<String, Boolean> resultMap = new HashMap<>();
        List<ItemImageDto> itemImageDtos = itemImageService.findItemImagesByItemId(itemId);

        for(ItemImageDto itemImageDto : itemImageDtos) {
            if(!itemImageService.deleteItemImage(itemImageDto.getItemImageId())) {
                resultMap.put("success", false);
                return ResponseEntity.ok(resultMap);
            }
        }

        boolean isSuccess = itemService.deleteItem(itemId);
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
