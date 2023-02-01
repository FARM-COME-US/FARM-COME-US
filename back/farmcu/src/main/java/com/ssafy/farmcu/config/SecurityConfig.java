package com.ssafy.farmcu.config;

import com.ssafy.farmcu.config.properties.AppProperties;
import com.ssafy.farmcu.config.properties.CorsProperties;
import com.ssafy.farmcu.oauth.filter.TokenAuthenticationFilter;
import com.ssafy.farmcu.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ssafy.farmcu.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ssafy.farmcu.oauth.repository.MemberRefreshTokenRepository;
import com.ssafy.farmcu.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ssafy.farmcu.oauth.service.PrincipalDetailsService;
import com.ssafy.farmcu.oauth.service.PrincipalOauth2MemberService;
import com.ssafy.farmcu.oauth.token.AuthTokenProvider;
import com.ssafy.farmcu.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    //    private final CustomOAuth2UserService customOAuth2UserService;
    private final PrincipalOauth2MemberService principalOauth2MemberService;
    private final AuthTokenProvider tokenProvider;
    private final AppProperties appProperties;
    private final MemberRefreshTokenRepository memberRefreshTokenRepository;
    private final PrincipalDetailsService principalDetailsService;
    private final CorsProperties corsProperties;



    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                // authorizeRequest 권한 관리 요청 시작
                .authorizeRequests()
                .antMatchers("/", "/css/**", "/images/**",
                        "/js/**", "/h2-console/**","/*/signin", "/*/signin/**",  "/*/signup", "/*/signup/**", "/find/**", "/social/**", "/book/**", "/test/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutSuccessUrl("/")
                .and()
                // oauth 로그인 기능
                .oauth2Login()
                // 인가에 대한 요청 서비스
                // "/oauth2/authorization"로 접근시 oauth 로그인 요청
                .authorizationEndpoint()
                .baseUri("/oauth/authorization")
                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                // callback 주소
                .redirectionEndpoint()
                .baseUri("/*/oauth2/code/*")
                .and()
                // user 조회
                .userInfoEndpoint()
                // oauth로 유저 정보를 받아오게 되면 oauth2 인증 유저 객체로 등록하게끔 구현된 커스텀 클래스
                .userService(principalOauth2MemberService)
                // 조회 성공/실패
                .and()
                // 정상적으로 유저 인증되어 등록되면 실행되는 클래스(JWT)
                .successHandler(oAuth2AuthenticationSuccessHandler())
                .failureHandler(oAuth2AuthenticationFailureHandler());

        // 로그인 요청을 가로채 usernamepasswordAuthenticationToken이라는 인증용 객체 생성
        return http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class).build();
    }

    /*
     * Spring Security에서 인증을 담당하는 AuthenticationManager auth 매니저 설정
     * */
//    @Bean
//    protected AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }

    /*
    토큰 필터 설정
     */
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter(tokenProvider);
    }

    /**
     * security 설정 시, 사용할 인코더
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * Oauth 인증 성공 핸들러
     * */
    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                tokenProvider,
                appProperties,
                memberRefreshTokenRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository()
        );
//        return new OAuth2AuthenticationSuccessHandler();
    }

    /*
     * Oauth 인증 실패 핸들러
     * */
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
//        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
        return new OAuth2AuthenticationFailureHandler();
    }

    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository(){
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception{
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(principalDetailsService)
                .passwordEncoder(passwordEncoder())
                .and().build();
    }

    /*
     * Cors 설정
     * */
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource corsConfigSource = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders().split(",")));
        corsConfig.setAllowedMethods(Arrays.asList(corsProperties.getAllowedMethods().split(",")));
        corsConfig.setAllowedOrigins(Arrays.asList(corsProperties.getAllowedOrigins().split(",")));
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(corsConfig.getMaxAge());

        corsConfigSource.registerCorsConfiguration("/**", corsConfig);
        return corsConfigSource;
    }
}