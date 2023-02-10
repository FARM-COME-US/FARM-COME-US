import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MdPermIdentity, MdLockOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import axios from "axios";
import userSlice from "../reduxStore/userSlice";

// 이 함수도 수정필요 😀 기본형으로 해둠.
// import { asyncSomethingFetch } from "../reduxStore/userSlice";
// import userSlice from "../reduxStore/userSlice";
import Button from "../components/common/Button";
import KakaoLogin from "../components/user/KakaoLogin";
import classes from "./style/Login.module.scss";

function Login() {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log("성공");
  // console.log(location);
  let signUpId = "";
  let signUpPassword = "";

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  if (location.state !== null) {
    signUpId = location.state.id;
    signUpPassword = location.state.password;
    if (!userId && !password) {
      setUserId(signUpId);
      setPassword(signUpPassword);
    }
  } else {
  }

  const loginHandler = async () => {
    const data = {
      id: userId,
      password: password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    try {
      console.log("로그인시도");
      console.log(data);

      const response = await axios.post(
        "/api/api/v1/member/login",
        data,
        config
      );
      console.log(response);

      const accessToken = response.data["token"];
      // const refreshToken = response.data["refresh-token"];

      sessionStorage.setItem("accessToken", accessToken);
      // sessionStorage.setItem("refreshToken", refreshToken);

      // console.log(`엑세스토큰:${accessToken}`);

      const userDataRes = await axios.get("/api/api/v1/member/", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          token: accessToken,
        },
      });
      // console.log("응답");
      // console.log(userDataRes);
      // console.log("응답의 data의 userInfo");
      // console.log(userDataRes.data.userInfo);
      dispatch(userSlice.actions.login(userDataRes.data.userInfo));
      navigate("/");
    } catch (err) {
      setIsError(true);
      setErrMessage("입력 정보를 확인해주세요.");
      setTimeout(() => {
        setIsError(false);
        setErrMessage("");
      }, 500);
      console.log(err);
    }
  };

  const LoginSubmit = (e) => {
    e.preventDefault();
    loginHandler();

    // dispatch(
    //   userSlice.actions.login({ userId: userId, password: password })
    // );

    // console.log({ userId: userId, password: password });
    // alert(
    //   "이렇게 하지말고 밑 오른쪽에 오류를 알려주는걸 흔들면서 넣어줘야지. 수정필요"
    // );
  };

  return (
    <div className={classes.screen}>
      <h1 className={classes.headertxt}>로그인</h1>
      <form
        className={`${classes.centeralign} ${classes.marginSpacing20px}`}
        onSubmit={LoginSubmit}
      >
        {/* <label htmlFor="id">
          <MdPermIdentity />
        </label> 😀라벨 일단 제거 */}
        <div className={isError ? classes.vibration : ""}>
          <MdPermIdentity className={classes.idicon} />
          <input
            className={`${classes.inputbar}`}
            placeholder="아이디"
            value={userId ? userId : ""}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            id="userId"
          />
        </div>
        <br />
        {/* <label htmlFor="password">PW: </label>😀라벨 일단 제거 */}
        <div className="asdasd">
          <div className={isError ? classes.vibration : ""}>
            <MdLockOutline className={classes.pwicon} />
            {showPassword ? (
              <AiFillEyeInvisible
                className={classes.smallicon}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <AiFillEye
                className={classes.smallicon}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
            <input
              className={classes.inputbar}
              placeholder="비밀번호"
              value={password ? password : ""}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              type={showPassword ? "text" : "password"}
            />
          </div>
          {isError && (
            <span className={`${errMessage ? classes.errMessage : ""}`}>
              {errMessage}
            </span>
          )}
        </div>
        <br />

        <div className={classes.marginSpacing_ratio}>
          <Button
            type="submit"
            className={`${classes.loginButton} ${classes.marginSpacing16px}`}
          >
            사용자 로그인
          </Button>
        </div>
      </form>
      <div className={`${classes.marginSpacing16px}`}>
        <KakaoLogin />
      </div>
      <Button
        className={`${classes.signUpButton} ${classes.marginSpacing16px}`}
        onClick={() => {
          navigate("/sign-up");
        }}
      >
        회원가입
      </Button>
    </div>
  );
}

export default Login;
