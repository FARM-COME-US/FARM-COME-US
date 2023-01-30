package com.ssafy.farmcu.service.item;

import com.ssafy.farmcu.dto.ItemDto;
import com.ssafy.farmcu.dto.request.item.ItemSearchReq;
import com.ssafy.farmcu.dto.request.item.ItemUpdateReq;

import java.util.List;

public interface itemService {

    //상품 생성
    public void saveItem(ItemDto itemDto);

    //상품 수정
    public void updateItem(ItemUpdateReq itemUpdateReq);

    //상품 삭제
    public void deleteItem(Long itemId);

    //상품 전체 조회
    public List<ItemDto> findItems();

    //상품 상세 조회
    public ItemDto findOne(Long itemId);

//    //상품 이름 검색
//    public List<Item> findItemsByItemName(String itemName);
//
//    //상품 카테고리 검색
//    public List<Item> findItemsByCategoryCode(Long categoryCode);

    //상품 이름, 카테고리 검색
    public List<ItemDto> findItemsByItemNameAndCategoryCode(ItemSearchReq itemSearchReq);

}
