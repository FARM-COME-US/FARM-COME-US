import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userSlice from "../../reduxStore/userSlice";

import classes from "./OAuth2RedirectHandler.module.scss";

// import Spinner from "../spinner";

const getTokenURL = "api/api/v1/login/oauth";
const getUserInfoURL = "api/api/v1/member";

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
    console.log("0");
    await axios
      .get(getTokenURL, { params: { code: code } })
      .then((res) => {
        console.log(res);
        console.log("1");
        console.log(res.data);
        const token = res.data;
        sessionStorage.setItem("accessToken", token); //😀
        console.log("2");
        KakaoLoginMatch(res);
        console.log("3");
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

  const KakaoLoginMatch = async (value) => {
    if (value?.status === 200) {
      console.log("로그인 성공!");
      console.log("아래에 res들어감.");
      console.log(value);
      const accessToken = sessionStorage.getItem("accessToken");
      console.log(accessToken);
      const userDataRes = await axios.get("/api/api/v1/member/", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          token: accessToken,
        },
      });

      // const userInfoRes = await axios.get(getUserInfoURL);
      dispatch(userSlice.actions.login(value?.data));
      // 백엔드에서 넘겨주는 데이터를 dispatch로 내 리덕스에 넘김.

      navigate("/");
      // 토큰 받아왔으면 리덕스에 넘긴다. session에 던질까? 이건 고민 필요하다.
    } else {
      alert("로그인이 실패하였습니다. 다시 시도해주세요.");
      navigate("/login");
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

  return (
    <div className={classes.container}>
      <div className={classes.loadingTxt}>Kakao Loading...</div>
    </div>
  );
}

export default OAuth2RedirectHandler;
