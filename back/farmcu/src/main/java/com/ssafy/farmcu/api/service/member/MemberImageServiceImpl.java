package com.ssafy.farmcu.api.service.member;

import com.ssafy.farmcu.api.dto.member.MemberImageDto;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.member.MemberImage;
import com.ssafy.farmcu.api.repository.MemberImageRepository;
import com.ssafy.farmcu.api.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class MemberImageServiceImpl implements MemberImageService{
    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;

    @Override
    public boolean saveMemberImage(MemberImageDto memberImageDto) {
        try {
            Member member = memberRepository.findByMemberId(memberImageDto.getMemberId()).orElseThrow(NullPointerException::new);
            MemberImage memberImage = MemberImage.builder()
                    .originalName(memberImageDto.getOriginalName())
                    .savedPath(memberImageDto.getSavedPath())
                    .member(member)
                    .build();

            memberImageRepository.save(memberImage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateMemberImage(MemberImageDto memberImageDto) {
        try {
            Member member = memberRepository.findByMemberId(memberImageDto.getMemberId()).orElseThrow(NullPointerException::new);
            MemberImage memberImage = memberImageRepository.findByMemberAndMemberImageId(member, memberImageDto.getMemberImageId()).orElseThrow(NullPointerException::new);
            memberImage.setOriginalName(memberImageDto.getOriginalName());
            memberImage.setSavedPath(memberImage.getSavedPath());

            memberImageRepository.save(memberImage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteMemberImage(Long memberImageId) {
        try {
            memberImageRepository.deleteByMemberImageId(memberImageId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public MemberImageDto findMemberImageByMemberId(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(NullPointerException::new);
        MemberImage memberImage = memberImageRepository.findByMemberId(member.getMemberId()).orElse(null);
        if(memberImage==null)
            return null;
        return new MemberImageDto(memberImage);
    }


}
