import classes from "./KakaoLogin.module.scss";

const KakaoLogin = (props) => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  // 버튼 누르면 OAuth2RedirectHandler를 보여주는걸로 라우팅 추가
  return (
    <a href={KAKAO_AUTH_URL}>
      <img
        src="img/kakao_login_button.png"
        alt=""
        className={classes.kakaobutton}
      />
    </a>
  );
};

export default KakaoLogin;
