package com.ssafy.farmcu.service.item;

import com.ssafy.farmcu.dto.ItemDto;
import com.ssafy.farmcu.dto.request.item.ItemSearchReq;
import com.ssafy.farmcu.dto.request.item.ItemUpdateReq;
import com.ssafy.farmcu.entity.store.Item;
import com.ssafy.farmcu.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public boolean saveItem(ItemDto itemDto) {
        try {
            Item item = Item.builder()
                    .itemId(itemDto.getItemId())
                    .itemName(itemDto.getItemName())
                    .itemDescription(itemDto.getItemDescription())
                    .itemImg(itemDto.getItemImg())
                    .itemPrice(itemDto.getItemPrice())
                    .itemDiscount(itemDto.getItemDiscount())
                    .itemStock(itemDto.getItemStock())
                    .category(itemDto.getCategory())
                    .store(itemDto.getStore())
                    .build();

            itemRepository.save(item);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateItem(ItemUpdateReq itemUpdateReq) {
        try {
            Item item = Item.builder()
                    .itemId(itemUpdateReq.getItemId())
                    .itemName(itemUpdateReq.getItemName())
                    .itemDescription(itemUpdateReq.getItemDescription())
                    .itemImg(itemUpdateReq.getItemImg())
                    .itemPrice(itemUpdateReq.getItemPrice())
                    .itemDiscount(itemUpdateReq.getItemDiscount())
                    .itemStock(itemUpdateReq.getItemStock())
                    .category(itemUpdateReq.getCategory())
                    .build();

            itemRepository.save(item);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteItem(Long itemId) {
        try {
            itemRepository.deleteById(itemId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public ItemDto findOne(Long itemId) {
        Item item = itemRepository.findByItemId(itemId);
        return new ItemDto(item);
    }

    @Override
    public List<ItemDto> findItemsByItemNameAndCategoryCode(ItemSearchReq itemSearchReq) {
        List<Item> items = itemRepository.findByItemNameAndCategory(itemSearchReq.getItemName(), itemSearchReq.getCategory());
        List<ItemDto> result = items.stream()
                .map(i -> new ItemDto(i))
                .collect(toList());
        return result;
    }

}
