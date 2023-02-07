import React from "react";
// import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MyPageHeader from "../../components/mypage/MyPageHeader";
// import axios from "axios";

const DUMMY_MYPAGE_INFO = {
  id: 1,
  nickname: "홍당홍당",
  name: "홍당무",
  email: "ssafy123@ssafy.com",
  addr: "강원도 평창군 봉평면 무야리 23-12",
  pno: "010-1234-1234",
  storeId: null,
};

const MyPage = (props) => {
  // 유저정보 관리 변수
  // const [userInfo, setUserInfo] = useState({ ...DUMMY_MYPAGE_INFO });
  // const header = "";
  // const param = "";
  // const fetchURL = "backend/userinfo";

  const profileImg = "";

  // useState로 받아와서 갈아치워야할거같음.

  // useEffect로 첫 렌더링시 데이터 가져옴.
  // const getUserInfo = useEffect(() => {
  //   async function fetchData() {
  //     const res = await axios.get(fetchURL, header, param);
  //     // 수정필요. 토큰 넣어서 전송해야됨. 그리고, 넣어서 전송해줘야함.
  //     setUserInfo(res.data);
  //   }
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   fetchData();

  //   return;
  // }, []);

  return (
    <div>
      <MyPageHeader profileImg={profileImg} userInfo={DUMMY_MYPAGE_INFO} />
      <Outlet context={{ info: DUMMY_MYPAGE_INFO }} />
    </div>
  );
};

export default MyPage;
