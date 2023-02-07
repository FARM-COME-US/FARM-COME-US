import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MyPageHeader from "../../components/mypage/MyPageHeader";
import axios from "axios";
import Button from "../../components/common/Button";
import MyPageInput from "../../components/mypage/MyPageInput";
import classes from "./style/MyPage.module.scss";

const MyPage = (props) => {
  // 유저정보 관리 변수
  const [userInfo, setUserInfo] = useState("");
  const header = "";
  const param = "";
  const fetchURL = "backend/userinfo";

  const profileImg = "";
  const [nickname, setNickname] = useState("귀여운 양파");
  const [name, setName] = useState("sjkim");
  const [email, setEmail] = useState("foobar@naver.com");
  const [fullAddress, setFullAddress] = useState("멀캠 72-13");
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");

  // useState로 받아와서 갈아치워야할거같음.

  // useEffect로 첫 렌더링시 데이터 가져옴.
  const getUserInfo = useEffect(() => {
    async function fetchData() {
      const res = await axios.get(fetchURL, header, param);
      // 수정필요. 토큰 넣어서 전송해야됨. 그리고, 넣어서 전송해줘야함.
      setUserInfo(res.data);
    }
    const accessToken = sessionStorage.getItem("accessToken");
    fetchData();

    return;
  }, []);

  return (
    <div>
      <MyPageHeader profileImg={profileImg} nickname={nickname} />
      <Outlet />
    </div>
  );
};

export default MyPage;
