package com.ssafy.farmcu.api.service.store;

import com.ssafy.farmcu.api.dto.member.MemberListRes;
import com.ssafy.farmcu.api.dto.store.StoreLikeCreateDto;
import com.ssafy.farmcu.api.dto.store.StoreLikeDto;
import com.ssafy.farmcu.api.dto.store.StoreLikeStoreListDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.store.Store;
import com.ssafy.farmcu.api.entity.store.StoreLike;
import com.ssafy.farmcu.api.repository.MemberRepository;
import com.ssafy.farmcu.api.repository.StoreLikeRepository;
import com.ssafy.farmcu.api.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoreLikeServiceImpl implements StoreLikeService{

    private final MemberRepository memberRepository;
    private final StoreRepository storeRepository;
    private final StoreLikeRepository storeLikeRepository;


    @Transactional
    @Override
    public boolean saveLike(StoreLikeCreateDto storeLikeDto) {
        Member member = memberRepository.findById(storeLikeDto.getMemberId()).orElse(null);
        Store store = storeRepository.findByStoreId(storeLikeDto.getStoreId()).orElse(null);
        if(member!=null && store!=null){
            StoreLike storeLike = StoreLike.builder()
                    .member(member)
                    .store(store)
                    .build();
            try {
                storeLikeRepository.save(storeLike);
                return true;
            }catch (Exception e){
                e.printStackTrace();
                return false;
            }
        }
        return false;
    }

    @Transactional
    @Override
    public boolean deleteLike(StoreLikeDto storeLikeDto) {
        Member member = memberRepository.findById(storeLikeDto.getMemberId()).orElse(null);
        Store store = storeRepository.findByStoreId(storeLikeDto.getStoreId()).orElse(null);
        if(member!=null && store!=null){
            StoreLike storeLike = StoreLike.builder()
                    .id(storeLikeDto.getId())
                    .member(member)
                    .store(store)
                    .build();
            try {
                storeLikeRepository.delete(storeLike);
                return true;
            }catch (Exception e){
                e.printStackTrace();
                return false;
            }
        }
        return false;
    }

    @Override
    public List<StoreLikeStoreListDto> findLikes(Long memberId) {
        List<StoreLike> storeLikes = storeLikeRepository.findStoreLikeByMember(memberId);
        List<StoreLikeStoreListDto> result = new ArrayList<>();
        if(storeLikes!=null){
//            for(StoreLike storeLike : storeLikes){
//                StoreLikeStoreListDto storeLikeStoreListDto = StoreLikeStoreListDto.builder()
//                        .storeDto(storeLike.getStore())
//                        .build();
//            }

        }


        return null;
    }

    @Override
    public List<Long> findLikesId(Long storeId) { //해당 스토어에 좋아요 누른 멤버 아이디 리턴
        List<Long> memberIdList = storeLikeRepository.findMemberIdByStoreId(storeId);
        return memberIdList;
    }


    @Override
    public List<MemberListRes> findLikesMembers(Long storeId) { // 해당 스토어에 좋아요 누른 멤버 리스트 리턴
        List<MemberListRes> memberList = storeLikeRepository.findStoreLikeByStore(storeId);


        return memberList;
    }

    @Override
    public int getCount(Long storeId) {
        return 0;
    }
}
