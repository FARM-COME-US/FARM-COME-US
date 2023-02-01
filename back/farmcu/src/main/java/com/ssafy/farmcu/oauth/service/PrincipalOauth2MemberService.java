package com.ssafy.farmcu.oauth.service;

import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.member.ProviderType;
import com.ssafy.farmcu.oauth.Info.KakaoMemberInfo;
import com.ssafy.farmcu.oauth.Info.OAuth2MemberInfo;
import com.ssafy.farmcu.oauth.PrincipalDetails;
import com.ssafy.farmcu.api.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

import static com.ssafy.farmcu.api.entity.member.RoleType.ROLE_USER;

/**
 * 소셜로그인 처음인지 확인하기
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class PrincipalOauth2MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);

        //provider 판별
        ProviderType providerType = ProviderType.valueOf(request.getClientRegistration().getRegistrationId().toUpperCase());
        log.debug("현재 provider: " + providerType);
        OAuth2MemberInfo oAuthMemberInfo = null;
        String profileImg = "";
        String ProviderId = "";
        String nickname = "";
        if (providerType.equals(ProviderType.KAKAO)) {
            log.debug("KAKAO");
            System.out.println("카카오다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//            System.out.println(oAuth2User.getAttributes().toString());
//            System.out.println(oAuth2User.getAttributes().get("kakao_account"));
//            Map<String, Object> map = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
            Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
//            String id = "kakao" + (String) map.get("id");
            nickname  = (String) properties.get("nickname");
            profileImg = (String) properties.get("profile_image");
//            System.out.println(map.get("email"));
            oAuthMemberInfo = new KakaoMemberInfo((Map<String, Object>) oAuth2User.getAttributes().get("kakao_account"));
            ProviderId = oAuth2User.getAttributes().get("id") +"";
//            System.out.println(oAuthMemberInfo.getProviderId());


        } else {
            log.debug("not KAKAO");
            oAuthMemberInfo = new KakaoMemberInfo((Map<String, Object>) oAuth2User.getAttributes().get("kakao_account"));
        }
//        System.out.println("HHHHHHHHHHHHEEEEEEEERRRRRRRRRREEEEEEEEEEE: " +;
//        log.debug("oAuthMemberInfo: " + oAuthMemberInfo.getProviderId());
        Optional<Member> member = memberRepository.findById(oAuthMemberInfo.getProvider() + "-"+ ProviderId);

        String ID = oAuthMemberInfo.getProvider() + "-"+ ProviderId;
        String passwrod = "null";
        String email = oAuthMemberInfo.getEmail();



        // DB에 없는 Member라면 회원가입
        if (member.isEmpty()) {
            log.debug("소셜 회원가입");
            System.out.println("**************************kakao login********************");

            member = Optional.ofNullable(Member.builder()
                    .id(ID)
                    .detailAddr("")
                    .profileImg(profileImg)
                    .email(email)
                    .name(nickname)
                    .zipcode("")
                    .password("")
                    .phoneNumber("")
                    .role(ROLE_USER)
                    .build());
            memberRepository.save(member.get());

            return new
                    PrincipalDetails(member.get(), oAuth2User.getAttributes());
//            Member newMember = createUser(oAuthMemberInfo, providerType);
//            return new PrincipalDetails(newMember, oAuth2User.getAttributes());
        } else {
            log.debug("소셜 로그인");
            return new PrincipalDetails(member.get(), oAuth2User.getAttributes());
        }

    }


}

