import React, { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MyPageHeader from "../../components/mypage/MyPageHeader";
import { fetchUserInfo } from "../../utils/api/user-http";

const DUMMY_MYPAGE_INFO = {
  id: 1,
  nickname: "홍당홍당",
  name: "홍당무",
  email: "ssafy123@ssafy.com",
  pno: "010-1234-1234",
  storeId: null,
  streetAddr: "강원도 평창군 봉평면 무야리 23-12",
  detailAddr: "강원 아파트",
  zipcode: 34212,
};

const MyPage = (props) => {
  // 유저정보 관리 변수
  const [userInfo, setUserInfo] = useState({
    id: 1,
    nickname: "",
    name: "",
    email: "",
    pno: "",
    storeId: null,
    streetAddr: "",
    detailAddr: "",
    zipcode: "",
  });
  // const header = "";
  // const param = "";
  // const fetchURL = "backend/userinfo";

  const profileImg = "";

  // useState로 받아와서 갈아치워야할거같음.

  // useEffect로 첫 렌더링시 데이터 가져옴.
  useEffect(() => {
    const testMemberId = 1;
    const fetchedInfo = fetchUserInfo(testMemberId);
    console.log(fetchedInfo);
  }, []);

  return (
    <div>
      <MyPageHeader profileImg={profileImg} userInfo={DUMMY_MYPAGE_INFO} />
      <Outlet context={{ info: DUMMY_MYPAGE_INFO }} />
    </div>
  );
};

export default MyPage;
