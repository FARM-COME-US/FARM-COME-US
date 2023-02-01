package com.ssafy.farmcu.api.service.item;

import com.ssafy.farmcu.api.dto.item.ItemDto;
import com.ssafy.farmcu.api.dto.item.ItemSearchReq;

import java.util.List;

public interface ItemService {

    //상품 생성
    public boolean saveItem(ItemDto itemDto);

    //상품 수정
    public boolean updateItem(ItemDto itemDto);

    //상품 삭제
    public boolean deleteItem(Long itemId);

//    //상품 전체 조회
//    public List<ItemDto> findItems();

    //상품 상세 조회
    public ItemDto findOne(Long itemId);

//    //상품 이름 검색
//    public List<Item> findItemsByItemName(String itemName);
//
//    //상품 카테고리 검색
//    public List<Item> findItemsByCategoryCode(Long categoryCode);

    //상품 이름, 카테고리 검색
    public List<ItemDto> findItemsByCategoryAndItemName(ItemSearchReq itemSearchReq);

}
