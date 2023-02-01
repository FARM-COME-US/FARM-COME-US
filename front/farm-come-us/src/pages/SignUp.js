import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style/SignUp.module.scss";
import DaumPostcodeEmbed from "react-daum-postcode";
import {
  MdPermIdentity,
  MdPhoneIphone,
  MdLockOutline,
  MdCheck,
  MdSearch,
} from "react-icons/md";
import axios from "axios";

const SignUp = () => {
  const REGISTER_USERS_URL = "http://signupURL";

  const [openModal, setOpenModal] = useState(false);
  //이름, 닉네임, 전화번호, 비밀번호, 비밀번호 확인, 주소, 상세주소(얘는 유효성검사 안함. 주택이면 없으니까.), 우편번호(주소 들어오면 있는거니까 얘도 유효성X)
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [zonecode, setZonecode] = useState("");

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [telMessage, setTelMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [roadAddressMessage, setRoadAddressMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isRoadAddress, setIsRoadAddress] = useState(false);
  const navigate = useNavigate();

  // 회원가입 정보 날리는 함수
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        id,
        nickname,
        tel,
        password,
        roadAddress,
        specificAddress,
        zonecode,
      };
      const body = JSON.stringify(newUser);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(newUser);

      await axios.post(REGISTER_USERS_URL, body, config).then((res) => {
        console.log("response:", res);
        if (res.status === 200) {
          navigate("/"); // 가입성공시 목적지 URL 바꿔야함. 수정필요
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 아이디
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setIdMessage("2글자 이상 10글자 미만으로 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("올바른 아이디 형식입니다 :)");
      setIsId(true);
    }
  }, []);

  // 닉네임
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setNicknameMessage("닉네임을 2글자 이상 10글자 미만으로 입력해주세요.");
      setIsNickname(false);
    } else {
      setNicknameMessage("올바른 닉네임 형식입니다 :)");
      setIsNickname(true);
    }
  }, []);
  // // 이메일 유효성검사 (예비로 남겨둠)
  // const onChangeEmail = useCallback((e) => {
  //   const emailRegex =
  //     /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  //   const emailCurrent = e.target.value;
  //   setEmail(emailCurrent);

  //   if (!emailRegex.test(emailCurrent)) {
  //     setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
  //     setIsEmail(false);
  //   } else {
  //     setEmailMessage("올바른 이메일 형식이에요 : )");
  //     setIsEmail(true);
  //   }
  // }, []);

  //전화번호
  const onBlurTel = useCallback((e) => {
    setTel(e.target.value);
    if (e.target.value.length === 11) {
      setTelMessage("올바른 전화번호 형식입니다. :)");
      setIsTel(true);
    } else {
      setTelMessage("- 를 빼고 숫자만 입력해주세요.");
      setIsTel(false);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);
  //dependency arr 수정필요 - password confirm도.

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  // 주소확인// 주소바뀌면 동작 - 만들고 수정필요(주소컴포넌트에서 값을 줬을때, useState바꿔줘야함.)
  const onChangeRoadAddress = useCallback(
    (e) => {
      if (roadAddress.length === 0) {
        // setRoadAddressMessage("주소를 입력해주세요."); 클릭눌렀을때..
        setIsRoadAddress(false);
      } else {
        setIsRoadAddress(true);
      }
    },
    [roadAddress]
  );

  const selectAddress = (data) => {
    setIsRoadAddress(true);
    setRoadAddress(data.roadAddress);
    setZonecode(data.zonecode);
    setOpenModal(!openModal);
  };

  // const onChangezonecode = useCallback(
  //   (e) => {
  //     setZonecode(e.target.value);
  //     if (zonecode.length === 0) {
  //       // setRoadAddressMessage("주소를 입력해주세요."); 클릭눌렀을때..
  //       setIsRoadAddress(false);
  //     } else {
  //       setIsRoadAddress(true);
  //     }
  //   },
  //   [zonecode]
  // );

  return (
    <form className={classes.container} onSubmit={submitHandler}>
      <div className={classes.subcontainer}>
        <h1>회원가입</h1>
        <div className={classes.formbox}>
          <div>
            <MdPermIdentity className={classes.icon} />
            <input
              className={classes.outerInput}
              text="아이디"
              type="text"
              placeholder="아이디"
              typename="id"
              onChange={onChangeId}
            />
          </div>

          {id.length > 0 && (
            <span
              className={`${classes.message} ${
                isId ? classes.success : classes.error
              }`}
            >
              {idMessage}
            </span>
          )}
        </div>

        <div className={classes.formbox}>
          <div>
            <MdPermIdentity className={classes.icon} />
            <input
              className={classes.outerInput}
              text="닉네임"
              type="nickname"
              placeholder="닉네임"
              typename="nickname"
              onChange={onChangeNickname}
            />
          </div>
          {nickname.length > 0 && (
            <span
              className={`${classes.message} ${
                isNickname ? classes.success : classes.error
              }`}
            >
              {nicknameMessage}
            </span>
          )}
        </div>
        <div className={classes.formbox}>
          <div>
            <MdPhoneIphone className={classes.icon} />
            <input
              className={classes.outerInput}
              type="tel"
              // class="form-control m-input"
              text="전화번호"
              placeholder="전화번호"
              typename="tel"
              pattern="[0-9]{11}"
              maxLength="13"
              onBlur={onBlurTel}
            />
          </div>
          {tel.length > 0 && (
            <span
              className={`${classes.message} ${
                isTel ? classes.success : classes.error
              }`}
            >
              {telMessage}
            </span>
          )}
        </div>
      </div>

      <div className={classes.subcontainer}>
        <div className={`${classes.formbox}`}>
          <div>
            <MdLockOutline className={classes.icon} />
            <input
              className={classes.outerInput}
              onChange={onChangePassword}
              passwordtext="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
              placeholder="비밀번호"
              type="password"
            />
          </div>
          {password.length > 0 && (
            <span
              className={`${classes.message} ${
                isPassword ? classes.success : classes.error
              }`}
            >
              {passwordMessage}
            </span>
          )}
        </div>

        <div className={classes.formbox}>
          <div>
            <MdCheck className={classes.icon} />
            <input
              className={classes.outerInput}
              onChange={onChangePasswordConfirm}
              passwordtext=" "
              placeholder="비밀번호 확인"
              type="password"
            />
          </div>
          {passwordConfirm.length > 0 && (
            <span
              className={`${classes.message} ${
                isPasswordConfirm ? classes.success : classes.error
              }`}
            >
              {passwordConfirmMessage}
            </span>
          )}
        </div>
      </div>

      <div className={classes.subcontainer}>
        <div className={classes.formbox}>
          <div>
            <MdSearch className={classes.icon} />
            <input
              onFocus={() => {
                setOpenModal(!openModal);
              }}
              onClick={() => {
                setOpenModal(!openModal);
              }}
              className={classes.outerInput}
              onChange={onChangeRoadAddress}
              addresstext=" "
              placeholder="주소를 검색해주세요."
              typetitle="roadAddress"
              value={roadAddress}
            />
          </div>
          {roadAddressMessage.length > 0 && (
            <span
              className={`${classes.message} ${
                roadAddressMessage ? classes.success : classes.error
              }`}
            >
              {roadAddressMessage}
            </span>
          )}
        </div>

        <div className={classes.formbox}>
          <input
            className={classes.outerInput}
            onChange={(e) => setZonecode(e.target.value)}
            passwordtext=" "
            placeholder="우편번호"
            typetitle="zonecode"
            value={zonecode}
          />
        </div>

        <div className={classes.formbox}>
          <input
            className={classes.outerInput}
            onChange={(e) => {
              console.log({
                isId,
                isNickname,
                isTel,
                isPassword,
                isPasswordConfirm,
                isRoadAddress,
              });
              setSpecificAddress(e.target.value);
            }}
            passwordtext=" "
            placeholder="상세주소"
            typetitle="specificRoadAddress"
          />
        </div>
      </div>

      {/* 이름, 이메일, 패스워드, 패스워드 확인, 주소가 다 맞다면 주황버튼으로 */}
      <div>
        <button
          className={`${classes.button} ${
            !(
              isId &&
              isNickname &&
              isTel &&
              isPassword &&
              isPasswordConfirm &&
              isRoadAddress
            )
              ? classes.disabled
              : ""
          }`}
          type="submit"
          disabled={
            !(
              isId &&
              isNickname &&
              isTel &&
              isPassword &&
              isPasswordConfirm &&
              isRoadAddress
            )
          }
        >
          다음
        </button>
      </div>
      {openModal && (
        <div className={`${classes.modal} ${classes.openModal}`}>
          <DaumPostcodeEmbed
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="동서대로 98-39" // 팝업을 열때 기본적으로 입력되는 검색어. 대전캠주소 해놨음.
          />
        </div>
      )}
    </form>
  );
};

export default SignUp;
