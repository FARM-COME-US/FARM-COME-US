## **TIL (Today's I Learned)**

**2023. 01. 16 (월) : WebRTC**
<br>

<img src="./resources/img/WebRTC_Logo.svg" style="width: 60%" alt="WebRTC_Logo" />

### **WebRTC 초기 설정**
---

1. [Docker Desktop 최신 버전 설치](https://www.docker.com/products/docker-desktop/)

2. [WSL2 (Windows Subsystem for Linux) 설치](https://learn.microsoft.com/ko-kr/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)

3. 리눅스 가상머신 설치

    윈도우 > Microsoft Store에서 Ubuntu 22.04.1(LTS) 설치
    

4. Docker에 kurento media server 설치

    설치된 Ubuntu CLI를 실행하여 아래 코드를 입력

```powershell
# docker에 kurento media server를 최신버전으로 이미지 생성
docker pull kurento/kurento-media-server:latest

# 생성된 kurento 이미지에서 컨테이너를 생성하여 실행
docker run -d --name kurento --network host \
kurento/kurento-media-server:latest
```

5. 여기서부터는 <a href="kurento-media-server">kurento-media-server만을 사용한 샘플코드</a>와 openVidu API를 사용한 샘플코드 실행법으로 나뉩니다.

<br><br>

## [**WebRTC kurento-media-server 샘플코드**](#kurento-media-server)
---
[참고 블로그](https://gh402.tistory.com/44)

<br><br>

## [**WebRTC openVidu API 샘플코드**](#openVidu)
---
[OpenVidu 공식 가이드 문서](https://docs.openvidu.io/en/stable/tutorials/openvidu-library-react/)


