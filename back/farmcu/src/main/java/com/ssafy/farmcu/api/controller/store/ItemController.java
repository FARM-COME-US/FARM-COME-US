package com.ssafy.farmcu.api.controller.store;

import com.ssafy.farmcu.api.dto.store.CategoryDto;
import com.ssafy.farmcu.api.dto.store.ItemDto;
import com.ssafy.farmcu.api.dto.store.ItemImageDto;
import com.ssafy.farmcu.api.dto.store.ItemSearchReq;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.service.store.CategoryService;
import com.ssafy.farmcu.api.service.store.ItemImageService;
import com.ssafy.farmcu.api.service.store.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/item")
@RequiredArgsConstructor
@Api(value = "상품 관련 API")
public class ItemController {

    private final CategoryService categoryService;
    private final ItemService itemService;
    private final ItemImageService itemImageService;

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
    public ResponseEntity<HashMap<String, Boolean>> createItem(ItemDto itemDto, MultipartFile[] uploadFile) throws IOException {
        boolean isSuccess = itemService.saveItem(itemDto);

        //이미지 첨부
        if(uploadFile != null && uploadFile.length > 0) {
            String uploadPath = "C:/Workspace/S08P12B103/back/farmcu/src/assets/itemImg";
            File uploadDir = new File(uploadPath);

            if(!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            for(MultipartFile file : uploadFile) {
                String savedName = new Random().nextInt(1000000000) + "." + file.getOriginalFilename().split("\\.")[1];
                File savedFile = new File(uploadPath + "/" + savedName);
                file.transferTo(savedFile);

                ItemImageDto itemImageDto = ItemImageDto.builder()
                        .itemId(itemDto.getItemId())
                        .originalName(file.getOriginalFilename())
                        .savedPath(savedName).build();

                itemImageService.saveItemImage(itemImageDto);
            }
        }

        HashMap<String, Boolean> resultMap = new HashMap<>();
        if(isSuccess) resultMap.put("success", true);
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
        System.out.println("*******************" + itemSearchReq.getCategoryName() + " " + itemSearchReq.getItemName());
        HashMap<String, Object> resultMap = new HashMap<>();
        HashMap<String, Object> itemText = itemService.findItemsByCategoryAndItemNameLike(itemSearchReq);
        List<ItemDto> itemList = (List<ItemDto>) itemText.get("itemList");
        Boolean hasNextPage = (Boolean) itemText.get("hasNextPage");

        List<ItemImageDto> itemImage = new ArrayList<>();
        for(ItemDto it : itemList) {
            itemImage.add(itemImageService.findItemImagesByItemId(it.getItemId()).get(0));
        }

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
