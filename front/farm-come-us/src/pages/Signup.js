import React, { useState, useEffect } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import classes from "./style/SignUp.module.scss";
import Postcode from "../components/user/Postcode";
import { useDispatch } from "react-redux";
import axios from "axios";
import Postcode2 from "../components/user/Postcode2";

const SignUp = () => {
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

  const [verifyId, setVerifyId] = useState("");

  useEffect(() => {
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

  return (
    <form className={classes.container}>
      <div className={classes.subcontainer}>
        <h1>회원가입</h1>
        <Input
          className={classes.inputbox}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, id: e.target.value });
          }}
        ></Input>
        <Input
          className={classes.inputbox}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, nickname: e.target.value });
          }}
        ></Input>
        <Input
          className={classes.inputbox}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, tel: e.target.value });
          }}
        ></Input>
      </div>
      <div className={classes.subcontainer}>
        <Input
          className={classes.inputbox}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, password: e.target.value });
          }}
        ></Input>
        <Input
          className={classes.inputbox}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, confirmPassword: e.target.value });
          }}
        ></Input>
      </div>
      <div className={classes.subcontainer}>
        <Input
          className={classes.inputbox}
          onBlur={(e) => {
            setSignUpForm({ ...signUpForm, roadAddress: e.target.value });
          }}
        ></Input>
        <Postcode className={classes.postcode} />
        <Postcode2 />
        <Input
          className={classes.inputbox}
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

export default SignUp;
