package com.ssafy.farmcu.api.entity;


import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthTokenRequest {

    @ApiModelProperty(notes = "Optional", example = "authorization_code")

    private String grantType;


    private String clientId;


    private String redirectUri;

    private String code;

    @ApiModelProperty(notes = "Optional")

    private String clientSecret;
}
