package com.ssafy.farmcu.service.member;


import com.ssafy.farmcu.dto.request.member.MemberJoinReq;
import com.ssafy.farmcu.dto.request.member.MemberLoginReq;
import com.ssafy.farmcu.dto.request.member.MemberUpdateReq;
import com.ssafy.farmcu.dto.response.member.MemberInfoRes;
import com.ssafy.farmcu.entity.member.Member;
import com.ssafy.farmcu.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
    @Autowired
    private MemberRepository memberRepository;

    private PasswordEncoder pwEncoder;

    // 일반 회원가입
    @Override
    public boolean createMember(MemberJoinReq memberJoinInfo){
        if(memberRepository.findById(memberJoinInfo.getId()) != null){
            return false; // 아이디 유효성 검사
        }

        Member newMember = memberRepository.save(memberJoinInfo.ToEntity());

        return true;
    }

    // member 조회
    @Override
    public Member getMemberById(String Id) {
        Member member = memberRepository.findById(Id);
        return member;
    }

    // member 정보 조회
    @Override
    public MemberInfoRes getMemberPhoto(String id) {
        Member member = memberRepository.findById(id);
        return MemberInfoRes.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .name(member.getName())
                .email(member.getEmail())
                .streetAddr(member.getStreetAddr())
                .detailAddr(member.getDetailAddr())
                .zipcode(member.getZipcode())
                .phoneNumber(member.getPhoneNumber())
                .profileImg(member.getProfileImg())
                .build();
    }



    // 회원 삭제 (탈퇴)
    @Override
    public boolean deleteMember(MemberLoginReq memberLoginInfo) {
        Member member = memberRepository.findById(memberLoginInfo.getId());
        if(pwEncoder.matches(memberLoginInfo.getPassword(), member.getPassword())){
            memberRepository.delete(member);
            return true;
        }
        return false;
    }


    // 회원 정보 수정
    @Override
    public boolean updateMember(MemberUpdateReq memberUpdateReq, String id) {
        Member member = memberRepository.findById(id);
        if(!pwEncoder.matches(memberUpdateReq.getPassword(), member.getPassword())){ // 비밀번호 검증
            return false;
        }
        member.setName(memberUpdateReq.getName());
        member.setEmail(memberUpdateReq.getEmail());
        member.setNickname(memberUpdateReq.getNickname());
        member.setProfileImg(memberUpdateReq.getProfileImg());
        member.setStreetAddr(memberUpdateReq.getStreetAddr());
        member.setDetailAddr(memberUpdateReq.getDetailAddr());
        member.setZipcode(memberUpdateReq.getZipcode());
        member.setPhoneNumber(memberUpdateReq.getPhoneNumber());
        member.setProfileImg(memberUpdateReq.getProfileImg());

        memberRepository.save(member);

        return true;
    }




}
