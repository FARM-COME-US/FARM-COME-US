import { KAKAO_AUTH_URL } from "./OAuth";

const KakaoLogin = (props) => {
  // <Button href={KAKAO_AUTH_URL}>카카오로 로그인하기</Button>
  // function kakaoLoginHandler() {
  //   fetch(KAKAO_AUTH_URL)
  // } onClick={kakaoLoginHandler}

  return (
    <a href={KAKAO_AUTH_URL}>
      <img src="img/kakao_login.png" alt="" />
    </a>
  );

  // (<button type='button' href={KAKAO_AUTH_URL}><img src="image/kakao_login.png" alt=""/></button>);
};

export default KakaoLogin;
