import React, { useState, useEffect, useValid } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import classes from "./style/SignUp.module.scss";
import Postcode from "../components/user/Postcode";
import { useDispatch } from "react-redux";
import axios from "axios";
import Postcode2 from "../components/user/Postcode2";
import { Navigate } from "react-router-dom";

const SignUpdummy = () => {
  const dispatch = useDispatch();

  const [signUpForm, setSignUpForm] = useState({
    id: "",
    nickname: "",
    tel: "",
    password: "",
    confirmPassword: "",
    roadAddress: "",
    specificAddress: "",
    zonecode: "",
  });

  // const { validForm, isValid } = useValid(signUpForm);

  // useEffect(() => {
  //   const exp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  //   if (!exp.test(signUpForm.id)) {
  //   }
  // }, [signUpForm]);

  // const [verifyId, setVerifyId] = useState("");

  useEffect(() => {
    console.log(signUpForm);
    if (signUpForm.id.length === 0) {
      // setVerifyId("아이디를 입력해주세요");
      console.log("비어있음");
    } else {
      // setVerifyId("되고있음.");
      console.log("안비어있음");
    }
  }, [signUpForm]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // signupURL 바꿔줘야한다.
    const res = await axios.post("signupURL", signUpForm);
  };
  // 회원가입 정보 날리는 함수

  return (
    <form className={classes.container}>
      <div className={classes.subcontainer}>
        <h1>회원가입</h1>
        <Input
          className={classes.inputbox}
          placeholder="아이디"
          value={signUpForm.id}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, id: e.target.value });
          }}
        ></Input>
        <Input
          className={classes.inputbox}
          placeholder="닉네임"
          value={signUpForm.nickname}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, nickname: e.target.value });
          }}
        ></Input>
        {/* 위 닉네임란에 닉네임 뽑기 버튼을 만들어서 돌리던, 가입할때 내맘대로 주던 해야함. */}
        <Input
          className={classes.inputbox}
          placeholder="전화번호"
          value={signUpForm.tel}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, tel: e.target.value });
          }}
        ></Input>
      </div>
      <div className={classes.subcontainer}>
        <Input
          className={classes.inputbox}
          placeholder="비밀번호"
          value={signUpForm.password}
          type="password"
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, password: e.target.value });
          }}
        ></Input>
        <Input
          className={classes.inputbox}
          placeholder="비밀번호 확인"
          value={signUpForm.confirmPassword}
          type="password"
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, confirmPassword: e.target.value });
          }}
        ></Input>
      </div>
      <div className={classes.subcontainer}>
        <Input
          className={classes.inputbox}
          placeholder="주소를 검색해주세요."
          value={signUpForm.roadAddress}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, roadAddress: e.target.value });
          }}
        ></Input>
        <Postcode className={classes.postcode} />
        <Postcode2 />
        <Input
          className={classes.inputbox}
          placeholder="상세주소"
          value={signUpForm.specificAddress}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, specificAddress: e.target.value });
          }}
        ></Input>
      </div>
      <Button className={classes.button} onClick={submitHandler}>
        회원가입
      </Button>
    </form>
  );
};

export default SignUpdummy;
