package com.ssafy.farmcu.api.controller.member;

import com.ssafy.farmcu.api.dto.ErrorResponse;
import com.ssafy.farmcu.api.dto.member.MemberJoinReq;
import com.ssafy.farmcu.api.dto.member.MemberLoginReq;
import com.ssafy.farmcu.api.dto.member.MemberResponseDto;
import com.ssafy.farmcu.api.dto.member.MemberUpdateReq;
import com.ssafy.farmcu.api.entity.member.Member;
import com.ssafy.farmcu.api.entity.member.MemberRefreshToken;
import com.ssafy.farmcu.api.service.member.MemberRefreshTokenServiceImpl;
import com.ssafy.farmcu.config.properties.AppProperties;
import com.ssafy.farmcu.oauth.repository.MemberRefreshTokenRepository;
import com.ssafy.farmcu.oauth.token.AuthToken;
import com.ssafy.farmcu.oauth.token.AuthTokenProvider;
import com.ssafy.farmcu.oauth.token.JwtServiceImpl;
import com.ssafy.farmcu.api.service.member.MemberServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.ssafy.farmcu.api.entity.member.RoleType.ROLE_USER;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
@Api("사용자 컨트롤러 API v1")
public class MemberController {

    private final MemberServiceImpl memberService;
    private final MemberRefreshTokenRepository refreshTokenRepository;
    private final AuthTokenProvider tokenProvider;
    private final AppProperties appProperties;

    private final JwtServiceImpl jwtService;
    private final MemberRefreshTokenServiceImpl refreshService;
    private final PasswordEncoder passwordEncoder;
    private final MessageSource messageSource;

    @PostMapping("/join")
    @ApiOperation(value = "회원 가입", notes = "")
    public ResponseEntity joinMember(@Validated @RequestBody MemberJoinReq request) {
        log.debug("MemberJoinReq DTO : {}", request);
        Member loginMember = memberService.findUser(request.getId());
        if (loginMember != null)
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body(new ErrorResponse("error.already.exit"));
        if (memberService.createMember(request)) {
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/login")
    @ApiOperation(value = "일반 로그인", notes = "access-Token, 로그인 결과 메시지", response = Map.class)
    public ResponseEntity<?> login(@RequestBody MemberLoginReq loginReq) {
        Member loginMember = memberService.findUser(loginReq.getId());
        log.info("here login start");
        if (loginMember == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("error.not.exist.user"));
        }
        if (!passwordEncoder.matches(loginReq.getPassword(), loginMember.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("error.wrong.pw"));
        }
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;


        Date now = new Date(); // accessToken 설정.
        AuthToken accessToken = tokenProvider.createAuthToken(
                Long.toString(loginMember.getMemberId()),
                loginMember.getRoleType().toString(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );
        // refreshToken 설정
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        try {
            resultMap.put("token", accessToken.getToken());
            resultMap.put("message", "success");
            status = HttpStatus.ACCEPTED;
            log.info("status : {}", status);

            // 리프레시 토큰 DB 저장
            if (refreshService.refreshTokenExists(loginMember.getId())) {
                log.info("리프레시 존재하지 않음. 디비 저장");
                refreshService.saveRefreshTokenTable(refreshToken.getToken(), loginMember.getId());
            } else {
                log.info("기존 리프레시 존재. 디비 갱신");
                refreshService.saveRefreshTokenTable(refreshToken.getToken(), loginMember.getId());
            }
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("message", "fail");
            status = HttpStatus.ACCEPTED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    @ApiOperation(value = "토큰으로 회원 정보 요청하기", notes = "", response = Map.class)
    @GetMapping("/")
    public ResponseEntity<?> selectMemberInfo(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        // 헤더에서 토큰 가져오기
        String token = request.getHeader("token");
        AuthToken authToken = tokenProvider.convertAuthToken(token);

        if (authToken.validate()) { // 토큰 검증.
            log.info("token is avvailable!");
            try {
                Long id = tokenProvider.getId(authToken);
//                MemberResponseDto memberDto = memberService.getUserInfo(memberId);
                MemberResponseDto memberDto = memberService.getUserInfo(id);
                resultMap.put("userInfo", memberDto);
                resultMap.put("message", "success");
                status = HttpStatus.ACCEPTED;
            } catch (Exception e) {
                log.debug("정보 조회 실패 : ", e);
                resultMap.put("message", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            log.info("사용 불가능한 토큰");
            resultMap.put("message", "fail");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<>(resultMap, status);

    }

    @ApiOperation(value = "로그아웃", notes = "회원 정보를 담은 Token을 제거한다.", response = Map.class)
    @GetMapping("/logout/{memberid}")
    public ResponseEntity<?> removeToken(@PathVariable("memberid") String memberid) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            refreshTokenRepository.deleteById(memberid);
            resultMap.put("message", "success");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {

            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);

    }

    @ApiOperation(value = "Access Token 재발급", notes = "만료된 access token을 재발급받는다.", response = Map.class)
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody MemberResponseDto memberDto, HttpServletRequest request) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        String token = request.getHeader("token"); // 리프레시 토큰
        if (jwtService.checkToken(token)) {
            if (token.equals(refreshTokenRepository.findById(memberDto.getId()).getRefreshToken())) {
                String accessToken = jwtService.createAccessToken("userid", memberDto.getId());
//                logger.debug("token : {}", accessToken);
//                logger.debug("정상적으로 액세스토큰 재발급!!!");
                resultMap.put("access-token", accessToken);
                resultMap.put("message", "success");
                status = HttpStatus.ACCEPTED;
            }
        } else {
//            logger.debug("리프레쉬토큰도 사용불!!!!!!!");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @ApiOperation(value = "회원 정보 수정", notes = "", response = Map.class)
    @PutMapping("/")
    public ResponseEntity<?> updateMember(@RequestBody MemberUpdateReq memberUpdateReq, HttpServletRequest request) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        String token = request.getHeader("token"); // 리프레시 토큰
        AuthToken authToken = tokenProvider.convertAuthToken(token);
//        String id = jwtService.getUserId();
        Long id = tokenProvider.getId(authToken);
        MemberResponseDto member = memberService.getUserInfo(id);
        if (authToken.validate()) {
            memberService.updateMember(memberUpdateReq, member.getId());
            resultMap.put("message", "success");

            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("message", "fail");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> selectMemberInfo(@PathVariable("memberId") Long memberId, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        if (jwtService.checkToken(request.getHeader("token"))) {
            log.info("token is avvailable!");
            try {
                MemberResponseDto memberDto = memberService.getUserInfo(memberId);
                resultMap.put("userInfo", memberDto);
                resultMap.put("message", "success");
                status = HttpStatus.ACCEPTED;
            } catch (Exception e) {
                log.debug("정보 조회 실패 : ", e);
                resultMap.put("message", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            log.info("사용 불가능한 토큰");
            resultMap.put("message", "fail");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<>(resultMap, status);

    }


    @GetMapping("/me/{id}")
    public ResponseEntity<MemberResponseDto> fetchUser(@PathVariable Long id) {
        log.info("/me");
        MemberResponseDto memberDto = memberService.getUserInfo(id);
        return ResponseEntity.ok(memberDto);
    }


    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴", notes = "")
    public ResponseEntity<?> deleteMember(@RequestHeader(value = "Authorization") String token, @RequestBody MemberLoginReq request) {
//        if(!tokenProvider.convertAuthToken(token).validate()){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(new ErrorResponse(messageSource.getMessage("error.jwt", null, LocaleContextHolder.getLocale())));
//        }
        if (refreshTokenRepository.findByIdAndRefreshToken(request.getId(), token) != null) {
            memberService.deleteMember(request);
            SecurityContextHolder.clearContext();

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(messageSource.getMessage("error.jwt", null, LocaleContextHolder.getLocale())));
    }


}