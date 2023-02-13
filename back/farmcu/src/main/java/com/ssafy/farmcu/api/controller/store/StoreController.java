package com.ssafy.farmcu.api.controller.store;

import com.ssafy.farmcu.api.dto.member.MemberJoinReq;
import com.ssafy.farmcu.api.dto.store.*;
import com.ssafy.farmcu.api.service.image.S3Service;
import com.ssafy.farmcu.api.service.store.StoreImageServiceImpl;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

/**
 * Create, Select, Delete, Update
 */


@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/v1/store")
@RestController
@Api("스토어 컨트롤러 API v1")
public class StoreController {

    private final StoreServiceImpl storeService;
    private final S3Service s3Service;
    private final StoreImageServiceImpl storeImageService;


    @PostMapping
    @ApiOperation(value="스토어 생성", notes = "")
    public ResponseEntity createStore(@RequestPart("store") StoreCreateReq request, MultipartFile uploadFile) throws Exception {
        log.info("member id: {}", request.getMemberId());
        if(storeService.checkStoreExist(request.getMemberId())!=null){
            return new ResponseEntity<String>("already exist", HttpStatus.ACCEPTED);
        }
        Long storeId = storeService.saveStore(request);
        log.info("store id : {}", storeId);

        //이미지 첨부
        if(storeId > 0L && uploadFile != null) {
                String savedPath = s3Service.uploadFile(uploadFile);
                log.info("here save file");
                StoreImageDto storeImageDto = StoreImageDto.builder()
                        .storeId(storeId)
                        .originalName(uploadFile.getOriginalFilename())
                        .savedPath(savedPath).build();

                storeImageService.saveStoreImage(storeImageDto);
        }

        HashMap<String, Object> result = new HashMap<>();

        if(storeId>0L){
            result.put("storeId", storeId);
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
        }else{
            result.put("message", "error");
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
        }
    }

    @GetMapping("/{storeId}")
    @ApiOperation(value="스토어 상세조회", notes = "")
    public ResponseEntity<?> selectOneStore(@PathVariable("storeId") Long id){
        StoreDto result = storeService.findStoreInfo(id);
        StoreImageDto storeImageDto = storeImageService.findStoreImageByStoreId(id);

        HashMap<String, Object> resultMap = new HashMap<>();

        resultMap.put("store", result);
        resultMap.put("storeImage", storeImageDto);

        if(result!=null){
            return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
        }
        else
            return new ResponseEntity<String>("store not exist", HttpStatus.NOT_FOUND);
    }
    @GetMapping("/mystore/{memberId}")
    @ApiOperation(value="스토어 상세조회", notes = "")
    public ResponseEntity<?> selectMyStore(@PathVariable("memberId") Long id){
        StoreDto result = storeService.findMyStoreInfo(id);
        StoreImageDto storeImageDto = storeImageService.findStoreImageByStoreId(result.getStoreId());

        HashMap<String, Object> resultMap = new HashMap<>();

        resultMap.put("store", result);
        resultMap.put("storeImage", storeImageDto);

        if(result!=null){
            return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
        }
        else
            return new ResponseEntity<String>("store not exist", HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{storeId}")
    @ApiOperation(value="스토어 정보 수정", notes = "")
    public ResponseEntity updateStore(@PathVariable("storeId") Long id, @Validated @RequestBody StoreUpdateReq request){
        if(storeService.updateStore(id, request)){
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<String>("error", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{storeId}")
    @ApiOperation(value = "스토어 삭제", notes="")
    public ResponseEntity<?> deleteStore(@PathVariable("storeId")Long id){
        //회원 유효성 검사 추후 추가
        if(storeService.deleteStore(id)){
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<String>("error", HttpStatus.NOT_FOUND);
        }
    }





}
