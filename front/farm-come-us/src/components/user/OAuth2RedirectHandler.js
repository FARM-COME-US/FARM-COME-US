import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userSlice from "../../reduxStore/userSlice";

// import Spinner from "../spinner";

const myServerURL = "BEserverURL";
const optionalREST = "optionalURL";

function OAuth2RedirectHandler(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  const KakaoLoginMatch = (value) => {
    if (value?.status === 200) {
      console.log("로그인 성공!");
      dispatch(userSlice.actions.login(value?.data));
      // 백엔드에서 넘겨주는 데이터를 dispatch로 내 리덕스에 넘김.
      navigate("/");
      // 토큰 받아왔으면 리덕스에 넘긴다. session에 던질까? 이건 고민 필요하다.
    } else {
      console.log("로그인 실패");
      //예외처리 추가
    }
  };

  const data = JSON.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
    client_secret: KAKAO_CLIENT_ID,
  });

  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      accesscode: code,
    };

    try {
      const postingAccessCode = await axios
        .post(myServerURL + optionalREST, config)
        .then((res) => {
          KakaoLoginMatch(res);
        });
      // 이 컴포넌트가 렌더링된다는것 자체가 code를 받아와서 실행된다는뜻임. post로 내 backend쪽에 accesscode와 함께 쏴준다.
      // 기본URL + optional REST주소에 accesscode:code를 담아서 post로 보냄.

      // 이것도 optional API 담아서 진행. 받아오고, 받아와지면 전역으로 보낸다. 그리고 로그인 상태로 true로 바꿀것임.
    } catch (err) {
      console.log(err);
    }
  }, []);
  // 로딩중인 화면을 띄우면서, 뒤의 로직이 발동되는것임.
  //
  return <div>Kakao Loging...</div>;
}

export default OAuth2RedirectHandler;
