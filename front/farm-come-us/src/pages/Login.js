import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdPermIdentity, MdLockOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import axios from "axios";

// 이 함수도 수정필요 😀 기본형으로 해둠.
import { asyncSomethingFetch } from "../reduxStore/userSlice";
import userSlice from "../reduxStore/userSlice";
import Button from "../components/common/Button";
import KakaoLogin from "../components/user/KakaoLogin";
import classes from "./style/Login.module.scss";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const response = await axios.post("Backend/member/login", {
        username: username,
        password: password,
      });
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const decodedAccessToken = jwt_decode(accessToken);
      const decodedRefreshToken = jwt_decode(refreshToken);
      sessionStorage.setItem("jwtAccess", JSON.stringify(decodedAccessToken));
      sessionStorage.setItem("jwtRefresh", JSON.stringify(decodedRefreshToken));
      dispatch(
        userSlice.actions.savetoken({
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
        //수정필요. 작동하는지 확인이 필요함. 세션에 저장하는거라서 이 부분이 필요 없다. 이 로직으로 끝낼거면..
      );
      navigate("/");
    } catch (err) {
      setIsError(true); // 수정필요. 이부분 괜찮은지 확인필요함.
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
    console.log(e);
    loginHandler();

    dispatch(
      userSlice.actions.login({ username: username, password: password })
    );

    console.log({ username: username, password: password });
    // alert(
    //   "이렇게 하지말고 밑 오른쪽에 오류를 알려주는걸 흔들면서 넣어줘야지. 수정필요"
    // );
  };
  return (
    <div className={classes.screen}>
      <h1>로그인</h1>
      <form
        className={`${classes.centeralign} ${classes.marginSpacing}`}
        onSubmit={LoginSubmit}
      >
        {/* <label htmlFor="id">
          <MdPermIdentity />
        </label> 😀라벨 일단 제거 */}
        <div className={isError ? classes.vibration : ""}>
          <MdPermIdentity className={classes.icon} />
          <input
            className={`${classes.inputbar}`}
            placeholder="아이디"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="username"
          />
        </div>
        <br />
        {/* <label htmlFor="password">PW: </label>😀라벨 일단 제거 */}

        <div>
          <div className={isError ? classes.vibration : ""}>
            <MdLockOutline className={classes.icon} />
            <input
              className={classes.inputbar}
              placeholder="비밀번호"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              type={showPassword ? "text" : "password"}
            />
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
          </div>
          {isError && (
            <span className={`${errMessage ? classes.errMessage : ""}`}>
              {errMessage}
            </span>
          )}
        </div>

        <br />

        <div className={classes.marginSpacing}>
          <Button type="submit" className={`${classes.signUpButton}`}>
            사용자 로그인
          </Button>
        </div>
      </form>
      <div className={classes.marginSpacing}>
        <KakaoLogin />
      </div>
      <Button
        className={classes.loginButton}
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
