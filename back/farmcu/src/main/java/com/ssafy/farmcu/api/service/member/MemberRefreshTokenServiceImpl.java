package com.ssafy.farmcu.api.service.member;

import com.ssafy.farmcu.api.entity.member.MemberRefreshToken;
import com.ssafy.farmcu.oauth.repository.MemberRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class MemberRefreshTokenServiceImpl {

    private final MemberRefreshTokenRepository memberRefreshTokenRepository;



    public boolean refreshTokenExists(String id){
        MemberRefreshToken memberRefreshToken = memberRefreshTokenRepository.findById(id);
        if(memberRefreshToken!=null) return true;
        else return false;
    }


    @Transactional
    public MemberRefreshToken saveRefreshTokenTable(String Token, String id){
        MemberRefreshToken memberRefreshToken = MemberRefreshToken.builder()
                .refreshToken(Token)
                .id(id)
                .build();
        return memberRefreshTokenRepository.save(memberRefreshToken);
    }
}
