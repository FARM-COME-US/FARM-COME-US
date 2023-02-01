// 아직 미완성
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
import {
  KAKAO_AUTH_URL,
  REST_API_KEY,
  REDIRECT_URI,
  KAKAO_CLIENT_ID,
} from "./OAuth";

// import Spinner from "../spinner";

const myServerURL = "myserverURL";
const optionalREST = "optionalURL";

function OAuth2RedirectHandler(props) {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  const data = JSON.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
    client_secret: KAKAO_CLIENT_ID,
  });

  useEffect(async () => {
    try {
      const postingAccessCode = await axios.post(myServerURL + optionalREST, {
        accesscode: code,
      });
      // 이 컴포넌트가 렌더링된다는것 자체가 code를 받아와서 실행된다는뜻임. post로 내 backend쪽에 accesscode와 함께 쏴준다.
      // 기본URL + optional REST주소에 accesscode:code를 담아서 post로 보냄.
      const gettingToken = await axios.get(myServerURL + "");
      // 이것도 optional API 담아서 진행. 받아오고, 받아와지면 전역으로 보낸다. 그리고 로그인 상태로 true로 바꿀것임.
    } catch (err) {
      console.log(err);
    }
  }, []);
  // 로딩중인 화면을 띄우면서, 뒤의 로직이 발동되는것임.
  //
  return <Spinner />;
}

export default OAuth2RedirectHandler;
