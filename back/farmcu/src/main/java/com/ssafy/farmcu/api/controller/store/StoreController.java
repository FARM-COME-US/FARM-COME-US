package com.ssafy.farmcu.api.controller.store;

import com.ssafy.farmcu.api.dto.member.MemberJoinReq;
import com.ssafy.farmcu.api.dto.store.StoreCreateReq;
import com.ssafy.farmcu.api.dto.store.StoreDto;
import com.ssafy.farmcu.api.dto.store.StoreUpdateReq;
import com.ssafy.farmcu.api.service.store.StoreServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * Create, Select, Delete, Update
 */


@Slf4j
@RequiredArgsConstructor
@RequestMapping("/store")
@RestController
@Api("스토어 컨트롤러 API v1")
public class StoreController {

    private final StoreServiceImpl storeService;


    @PostMapping("/")
    @ApiOperation(value="스토어 생성", notes = "")
    public ResponseEntity createStore(@Validated @RequestBody StoreCreateReq request){
        if(storeService.saveStore(request)){
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{storeId}")
    @ApiOperation(value="스토어 상세조회", notes = "")
    public ResponseEntity<?> selectOneStore(@PathVariable("storeId") Long id){
        StoreDto result = storeService.findStoreInfo(id);
        if(result!=null){
            return new ResponseEntity<StoreDto>(result, HttpStatus.ACCEPTED);
        }
        else
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{storeId}")
    @ApiOperation(value="스토어 정보 수정", notes = "")
    public ResponseEntity updateStore(@PathVariable("storeId") Long id, @Validated @RequestBody StoreUpdateReq request){
        if(storeService.updateStore(id, request)){
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{storeId}")
    @ApiOperation(value = "스토어 삭제", notes="")
    public ResponseEntity<?> deleteStore(@PathVariable("storeId")Long id){
        //회원 유효성 검사 추후 추가
        if(storeService.deleteStore(id)){
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
        }
    }





}
