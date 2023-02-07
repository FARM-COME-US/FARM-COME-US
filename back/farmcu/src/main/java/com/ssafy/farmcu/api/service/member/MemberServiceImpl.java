package com.ssafy.farmcu.api.service.member;

import com.ssafy.farmcu.api.dto.member.MemberJoinReq;
import com.ssafy.farmcu.api.dto.member.MemberLoginReq;
import com.ssafy.farmcu.api.dto.member.MemberResponseDto;
import com.ssafy.farmcu.api.dto.member.MemberUpdateReq;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.exception.NotFoundUserException;
import com.ssafy.farmcu.api.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    private final PasswordEncoder pwEncoder;

    @Transactional
    @Override
    public boolean createMember(MemberJoinReq memberJoinInfo) {
        log.debug("memberJoinInfo DTO : {}", memberJoinInfo);
        if(memberRepository.findById(memberJoinInfo.getId()).isPresent()){
            return false;
        }
        String pw = pwEncoder.encode(memberJoinInfo.getPassword());

        memberJoinInfo.updatePW(pw);
        Member newMember = memberRepository.save(memberJoinInfo.ToEntity());
        System.out.println(newMember.getCreatedAt());
        return true;
    }

    @Transactional(readOnly = true)
    public MemberResponseDto getUserInfo(Long id){
//        return memberRepository.findById(id).map(MemberResponseDto::of).orElseThrow(() -> new NotFoundUserException("아이디를 가진 사람이 없습니다."));
        return memberRepository.findByMemberId(id).map(MemberResponseDto::of).orElseThrow(() -> new NotFoundUserException("아이디를 가진 사람이 없습니다."));
    }

//    @Override
//    public MemberInfoRes getMemberPhoto(String Id) {
//        return null;
//    }f

    @Transactional(readOnly = true)
    public Member findUser(String id){
        Member member =memberRepository.findById(id).orElse(null);
        return member;
    }

    @Override
    public boolean deleteMember(MemberLoginReq memberLoginInfo) {
        Optional<Member> member = memberRepository.findById(memberLoginInfo.getId());
        if(pwEncoder.matches(memberLoginInfo.getPassword(), member.get().getPassword())){
            memberRepository.delete(member.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean updateMember(MemberUpdateReq memberUpdateReq, String id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new NotFoundUserException("아이디를 가진 사람이 없습니다."));
        if(!pwEncoder.matches(memberUpdateReq.getPassword(), member.getPassword())){ // 비밀번호 검증
            return false;
        }

        member.updateInfo(memberUpdateReq);

        return true;
    }
}

