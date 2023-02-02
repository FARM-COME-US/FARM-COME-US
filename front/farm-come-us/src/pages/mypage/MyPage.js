import React, { useState, useEffect } from "react";
import MyPageHeader from "../../components/mypage/MyPageHeader";
import axios from "axios";

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
      <div>
        마이페이지 바디 큰 덩어리. 폼태그 위에 마진살짝 주기
        <div>가입정보</div>
        <hr />
        <div>이름 라벨</div>
        <div>이름인풋</div>
        <div>이메일 라벨</div>
        <div>이메일 인풋</div>
        <div>주소 라벨</div>
        <div>주소 인풋</div>
        <div>연락처 라벨</div>
        <div>연락처 인풋</div>
        <div>버튼 위에 마진 살짝 줘서 스페이싱</div>
      </div>
    </div>
  );
};

export default MyPage;
