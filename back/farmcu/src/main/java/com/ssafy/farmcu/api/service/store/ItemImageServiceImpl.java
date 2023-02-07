package com.ssafy.farmcu.api.service.store;

import com.ssafy.farmcu.api.dto.store.ItemImageDto;
import com.ssafy.farmcu.api.entity.store.Item;
import com.ssafy.farmcu.api.entity.store.ItemImage;
import com.ssafy.farmcu.api.repository.ItemImageRepository;
import com.ssafy.farmcu.api.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ItemImageServiceImpl implements ItemImageService {

    private final ItemRepository itemRepository;
    private final ItemImageRepository itemImageRepository;

    @Override
    public boolean saveItemImage(ItemImageDto itemImageDto) {
        try {
            Item item = itemRepository.findByItemId(itemImageDto.getItemId()).orElseThrow(NullPointerException::new);
            ItemImage itemImage = ItemImage.builder()
                    .originalName(itemImageDto.getOriginalName())
                    .savedPath(itemImageDto.getSavedPath())
                    .item(item)
                    .build();

            itemImageRepository.save(itemImage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateItemImage(ItemImageDto itemImageDto) {
        try {
            Item item = itemRepository.findByItemId(itemImageDto.getItemId()).orElseThrow(NullPointerException::new);
            ItemImage itemImage = itemImageRepository.findByItemAndItemImageId(item, itemImageDto.getItemImageId()).orElseThrow(NullPointerException::new);
            itemImage.setOriginalName(itemImageDto.getOriginalName());
            itemImage.setSavedPath(itemImage.getSavedPath());

            itemImageRepository.save(itemImage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteItemImage(Long itemImageId) {
        try {
            itemImageRepository.deleteByItemImageId(itemImageId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ItemImageDto> findItemImagesByItemId(Long itemId) {
        Item item = itemRepository.findByItemId(itemId).orElseThrow(NullPointerException::new);
        List<ItemImage> itemImages = itemImageRepository.findAllByItem(item);
        List<ItemImageDto> result = itemImages.stream()
                .map(i -> new ItemImageDto(i))
                .collect(toList());

        return result;
    }

}
