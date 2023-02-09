import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userSlice from "../../reduxStore/userSlice";

// import Spinner from "../spinner";

// const myServerURL = "http://localhost:9090/kakao";
const myServerURL = "api/oauth/";

function OAuth2RedirectHandler(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   withCredentials: false,
  // };
  // 원래 있던거.

  const data = {
    code: code,
  };
  const getAxios = async () => {
    await axios
      .get(myServerURL, { params: { code: code } })
      .then((res) => {
        console.log(res);
        KakaoLoginMatch(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAxios();
  }, []);
  // 로딩중인 화면을 띄우면서, 뒤의 로직이 발동되는것임.
  //

  const KakaoLoginMatch = (value) => {
    if (value?.status === 200) {
      console.log("로그인 성공!");
      console.log(value);
      dispatch(userSlice.actions.login(value?.data));
      // 백엔드에서 넘겨주는 데이터를 dispatch로 내 리덕스에 넘김.
      navigate("/");
      // 토큰 받아왔으면 리덕스에 넘긴다. session에 던질까? 이건 고민 필요하다.
    } else {
      console.log("로그인 실패");
      //예외처리 추가
    }
  };

  // const data = JSON.stringify({
  //   grant_type: "authorization_code",
  //   // client_id: REST_API_KEY,
  //   // redirect_uri: REDIRECT_URI,
  //   code: code,
  //   // client_secret: KAKAO_CLIENT_ID,
  // });
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: false,
  };

  return <div>Kakao Loging...</div>;
}

export default OAuth2RedirectHandler;
