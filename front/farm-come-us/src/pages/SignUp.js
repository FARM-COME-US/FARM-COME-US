import React, { useState, useCallback } from "react";

import classes from "./style/SignUp.module.scss";
import DaumPostcodeEmbed from "react-daum-postcode";
import {
  MdPermIdentity,
  MdEmail,
  MdPhoneIphone,
  MdLockOutline,
  MdCheck,
  MdSearch,
} from "react-icons/md";
import _ from "lodash";
import { userSignUp } from "../utils/api/user-http";

const SignUp = () => {
  const [openModal, setOpenModal] = useState(false);
  //이름, 닉네임, 전화번호, 비밀번호, 비밀번호 확인, 주소, 상세주소(얘는 유효성검사 안함. 주택이면 없으니까.), 우편번호(주소 들어오면 있는거니까 얘도 유효성X)
  //이름, 이메일, 비밀번호, 비밀번호 확인
  // const [id, setId] = useState("");
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [pno, setPno] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [streetAddr, setStreetAddr] = useState("");
  // const [detailAddr, setDetailAddr] = useState("");
  // const [zipcode, setZipcode] = useState("");

  const [id, setId] = useState("myFarm");
  const [email, setEmail] = useState("myfarm@gmail.com");
  const [name, setName] = useState("팜컴어스");
  const [pno, setPno] = useState("01012341234");
  const [password, setPassword] = useState("asd12345!");
  const [passwordConfirm, setPasswordConfirm] = useState("asd12345!");
  const [streetAddr, setStreetAddr] = useState("대전 유성구 동서대로 98-39");
  const [detailAddr, setDetailAddr] = useState("삼성화재 유성캠퍼스");
  const [zipcode, setZipcode] = useState("34153");

  //오류메시지 상태저장
  const [idMessage, setUseridMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [pnoMessage, setPnoMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [streetAddrMessage, setStreetAddrMessage] = useState("");

  // 유효성 검사
  const [isid, setIsid] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);
  const [ispno, setIspno] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isstreetAddr, setIsStreetAddr] = useState(false);

  let nickname = ""; //랜덤 넣어서 뿌려주는거 필요

  // 회원가입 정보 날리는 함수
  const submitHandler = async (e) => {
    e.preventDefault();
    const adjArr = [
      "귀여운 ",
      "새콤 ",
      "부끄러운 ",
      "아삭한 ",
      "보은 ",
      "지친 ",
      "착한 ",
      "매운 ",
    ];
    const vegeArr = [
      "양파",
      "상추",
      "사과",
      "배추",
      "자몽",
      "포도",
      "양배추",
      "고구마",
      "쪽파",
      "달걀",
    ];
    nickname = _.sample(adjArr) + _.sample(vegeArr);

    const userInfo = {
      id,
      email,
      nickname,
      name,
      pno,
      password,
      streetAddr,
      detailAddr,
      zipcode,
    };

    userSignUp(userInfo);
  };

  // 아이디
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setUseridMessage("2글자 이상 10글자 미만으로 입력해주세요.");
      setIsid(false);
    } else {
      setUseridMessage("올바른 아이디 형식입니다 :)");
      setIsid(true);
    }
  }, []);

  // // 닉네임 😀 랜덤으로 보내주기로 했음.
  // const onChangeNickname = useCallback((e) => {
  //   setNickname(e.target.value);
  //   if (e.target.value.length < 2 || e.target.value.length > 10) {
  //     setNicknameMessage("닉네임을 2글자 이상 10글자 미만으로 입력해주세요.");
  //     setIsNickname(false);
  //   } else {
  //     setNicknameMessage("올바른 닉네임 형식입니다 :)");
  //     setIsNickname(true);
  //   }
  // }, []);

  // // 닉네임 😀 랜덤으로 보내주기로 했음.
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setNameMessage("이름을 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("올바른 이름 형식입니다 :)");
      setIsName(true);
    }
  }, []);

  // // 이메일 유효성검사 (예비로 남겨둠)
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  }, []);

  //전화번호
  const onBlurpno = useCallback((e) => {
    setPno(e.target.value);
    if (e.target.value.length === 11) {
      setPnoMessage("올바른 전화번호 형식입니다. :)");
      setIspno(true);
    } else {
      setPnoMessage("- 를 빼고 숫자만 입력해주세요.");
      setIspno(false);
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
  const onChangestreetAddr = useCallback(
    (e) => {
      if (streetAddr.length === 0) {
        // setStreetAddrMessage("주소를 입력해주세요."); 클릭눌렀을때..
        setIsStreetAddr(false);
      } else {
        setIsStreetAddr(true);
      }
    },
    [streetAddr]
  );

  const selectAddress = (data) => {
    console.log(data);
    setIsStreetAddr(true);
    setStreetAddr(data.roadAddress);
    setZipcode(data.zonecode);
    setOpenModal(!openModal);
  };

  // const onChangezipcode = useCallback(
  //   (e) => {
  //     setZipcode(e.target.value);
  //     if (zipcode.length === 0) {
  //       // setStreetAddrMessage("주소를 입력해주세요."); 클릭눌렀을때..
  //       setIsStreetAddr(false);
  //     } else {
  //       setIsStreetAddr(true);
  //     }
  //   },
  //   [zipcode]
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
                isid ? classes.success : classes.error
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
              text="이름"
              type="text"
              placeholder="이름"
              typename="name"
              onChange={onChangeName}
            />
          </div>

          {id.length > 0 && (
            <span
              className={`${classes.message} ${
                isName ? classes.success : classes.error
              }`}
            >
              {nameMessage}
            </span>
          )}
        </div>

        <div className={classes.formbox}>
          <div>
            <MdEmail className={classes.icon} />
            <input
              className={classes.outerInput}
              text="이메일"
              type="email"
              placeholder="이메일"
              typename="email"
              onChange={onChangeEmail}
            />
          </div>
          {email.length > 0 && (
            <span
              className={`${classes.message} ${
                isEmail ? classes.success : classes.error
              }`}
            >
              {emailMessage}
            </span>
          )}
        </div>

        {/* 닉네임 */}
        {/* <div className={classes.formbox}>
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
        </div> */}

        <div className={classes.formbox}>
          <div>
            <MdPhoneIphone className={classes.icon} />
            <input
              className={classes.outerInput}
              type="pno"
              // class="form-control m-input"
              text="전화번호"
              placeholder="전화번호"
              typename="pno"
              pattern="[0-9]{11}"
              maxLength="13"
              onBlur={onBlurpno}
            />
          </div>
          {pno.length > 0 && (
            <span
              className={`${classes.message} ${
                ispno ? classes.success : classes.error
              }`}
            >
              {pnoMessage}
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
              onChange={onChangestreetAddr}
              addresstext=" "
              placeholder="주소를 검색해주세요."
              typetitle="streetAddr"
              value={streetAddr}
            />
          </div>
          {streetAddrMessage.length > 0 && (
            <span
              className={`${classes.message} ${
                streetAddrMessage ? classes.success : classes.error
              }`}
            >
              {streetAddrMessage}
            </span>
          )}
        </div>

        <div className={classes.formbox}>
          <input
            className={classes.outerInput}
            onChange={(e) => setZipcode(e.target.value)}
            passwordtext=" "
            placeholder="우편번호"
            typetitle="zipcode"
            value={zipcode}
          />
        </div>

        <div className={classes.formbox}>
          <input
            className={classes.outerInput}
            onChange={(e) => {
              setDetailAddr(e.target.value);
            }}
            passwordtext=" "
            placeholder="상세주소"
            typetitle="specificstreetAddr"
          />
        </div>
      </div>

      {/* 이름, 이메일, 패스워드, 패스워드 확인, 주소가 다 맞다면 주황버튼으로 */}
      <div>
        <button
          className={`${classes.button} ${
            !(
              isid &&
              isEmail &&
              ispno &&
              isPassword &&
              isPasswordConfirm &&
              isstreetAddr
            )
              ? classes.disabled
              : ""
          }`}
          type="submit"
          disabled={
            !(
              isid &&
              isEmail &&
              ispno &&
              isPassword &&
              isPasswordConfirm &&
              isstreetAddr
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
      {openModal && (
        <div
          className={classes.backdrop}
          onClick={() => {
            setOpenModal(false);
          }}
        />
      )}
    </form>
  );
};

export default SignUp;
