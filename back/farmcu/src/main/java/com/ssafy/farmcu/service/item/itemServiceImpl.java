package com.ssafy.farmcu.service.item;

import com.ssafy.farmcu.dto.ItemDto;
import com.ssafy.farmcu.dto.request.item.ItemSearchReq;
import com.ssafy.farmcu.dto.request.item.ItemUpdateReq;
import com.ssafy.farmcu.entity.store.Item;
import com.ssafy.farmcu.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class itemServiceImpl implements itemService {

    private ItemRepository itemRepository;

    @Override
    public void saveItem(ItemDto itemDto) {
        Item item = new Item();
        item.setItemId(itemDto.getItemId());
        item.setItemName(itemDto.getItemName());
        item.setItemDescription(itemDto.getItemDescription());
        item.setItemImg(itemDto.getItemImg());
        item.setItemPrice(itemDto.getItemPrice());
        item.setItemDiscount(itemDto.getItemDiscount());
        item.setItemStock(itemDto.getItemStock());
//        item.setCategory();
//        item.setStore();
//        item.setItem
//
//        itemRepository.save(itemDto);
    }

    @Override
    public void updateItem(ItemUpdateReq itemUpdateReq) {

    }

    @Override
    public void deleteItem(Long itemId) {

    }

    @Override
    public List<ItemDto> findItems() {
        return null;
    }

    @Override
    public ItemDto findOne(Long itemId) {
        return null;
    }

    @Override
    public List<ItemDto> findItemsByItemNameAndCategoryCode(ItemSearchReq itemSearchReq) {
        return null;
    }
}
