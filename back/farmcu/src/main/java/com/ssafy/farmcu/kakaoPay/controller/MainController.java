package com.ssafy.farmcu.kakaoPay.controller;

import com.ssafy.farmcu.config.ApiInfoConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
@RequestMapping("/kakao/test")
public class MainController {

    private final String redirectUri;

    private final String appKey;

    public MainController(ApiInfoConfig apiInfoConfig) {
        this.redirectUri = apiInfoConfig.getRedirectUri();
        this.appKey = apiInfoConfig.getAppKey();
    }

    @RequestMapping("/")
    public String index(Model model) {
        log.info("redirectUri: {}, appKey: {}", redirectUri, appKey);
        model.addAttribute("redirectUri", redirectUri);
        model.addAttribute("appKey", appKey);
        return "index";
    }

    @ResponseBody
    @GetMapping("/kakao2")
    public void codeCallBack(@RequestParam String code) {
        System.out.println( "코드다!!!" + code);
    }
}
