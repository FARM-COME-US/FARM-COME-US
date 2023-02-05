const KakaoLogin = (props) => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  return (
    <a href={KAKAO_AUTH_URL}>
      <img src="img/kakao_login.png" alt="" />
    </a>
  );
};

export default KakaoLogin;
