const REST_API_KEY = "1da7b3747e086ab039713b8c280ee6d5";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
// 백엔드의 주소가 되어야함. 그래야 코드랑 같이 넘겨주게 됨.
// 내가 accesscode를 받아서 백한테 넘겨주게 되는건지 논의 필요함. 수정필요

const KAKAO_CLIENT_ID = "852513";
// ID 852513인가?
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
