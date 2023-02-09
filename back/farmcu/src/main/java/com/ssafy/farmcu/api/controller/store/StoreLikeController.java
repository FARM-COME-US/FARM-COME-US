package com.ssafy.farmcu.api.controller.store;

import com.ssafy.farmcu.api.dto.member.MemberListRes;
import com.ssafy.farmcu.api.dto.store.StoreDto;
import com.ssafy.farmcu.api.dto.store.StoreLikeCreateDto;
import com.ssafy.farmcu.api.dto.store.StoreLikeDto;
import com.ssafy.farmcu.api.dto.store.StoreListRes;
import com.ssafy.farmcu.api.service.store.StoreLikeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/v1/storelikes")
@RestController
@Api("스토어 컨트롤러 API v1")
public class StoreLikeController {
    private final StoreLikeServiceImpl storeLikeService;

    @PostMapping
    @ApiOperation(value="스토어 찜하기", notes = "")
    public ResponseEntity<?> createStore(@Validated @RequestBody StoreLikeCreateDto request){
        List<Long> memberIdList = storeLikeService.findLikesId(request.getStoreId());
        if(!memberIdList.contains(request.getMemberId())){
            if(storeLikeService.saveLike(request)){
                return new ResponseEntity<String>("interest success!!", HttpStatus.ACCEPTED);
            }else{
                return new ResponseEntity<String>("interest fail!!", HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<String>("interest already exists!!", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{storeId}")
    public ResponseEntity<?> delete(@Validated @RequestBody StoreLikeDto request){
        if(storeLikeService.deleteLike(request)){
            return new ResponseEntity<String>("uninterest success!!", HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<String>("uninterest fail", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> findStoreList(@PathVariable("memberId")Long id){
        try{
            List<StoreListRes> list = storeLikeService.findLikesList(id);
            if(!list.isEmpty()) {
                return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
            }else{
                return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
            }

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping("/count/{storeId}")
    public ResponseEntity<?> CountLikes(@PathVariable("storeId") Long id){
        try{
            return new ResponseEntity<>(storeLikeService.getCount(id), HttpStatus.ACCEPTED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(0, HttpStatus.OK);
        }
    }
}
