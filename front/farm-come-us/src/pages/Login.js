import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 이 함수도 수정필요 😀 기본형으로 해둠.
import { asyncSomethingFetch } from "../reduxStore/userSlice";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import classes from "./style/Login.module.scss";
import KakaoLogin from "../components/social/KakaoLogin";

function Login() {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncSomethingFetch());
    alert(
      "이렇게 하지말고 밑 오른쪽에 오류를 알려주는걸 흔들면서 넣어줘야지. 수정필요"
    );
  };
  return (
    <div className={classes.screen}>
      <div>로그인 화면입니다.</div>
      <form onSubmit={LoginSubmit}>
        <label htmlFor="id">ID: </label>
        <Input id="id" />
        <br />
        <label htmlFor="password">PW: </label>
        <Input id="password" />
        <br />

        <Button type="submit" className={classes.signUpButton}>
          제출하기
        </Button>
      </form>
      {/* 로그인버튼. 아직 어떤 인자를 넣어서 비동기 요청 보낼지 안정함. 연결된 userSlice도 수정필요 */}

      <Button
        className="signUpButton" //이거 색깔 왜 안먹지? 수정필요
        onClick={() => {
          navigate("/signin");
        }}
      >
        이거는 회원가입버튼
      </Button>
      <KakaoLogin />
    </div>
  );
}

export default Login;
