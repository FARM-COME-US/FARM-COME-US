import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MyPageHeader from "../../components/mypage/MyPageHeader";
import {
  fetchUserInfo,
  fetchUserInfoWithAccessToken,
} from "../../utils/api/user-http";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userSlice from "../../reduxStore/userSlice";
import axios from "axios";

const DUMMY_MYPAGE_INFO = {
  id: 1,
  nickname: "홍당홍당",
  name: "홍당무",
  email: "ssafy123@ssafy.com",
  phoneNumber: "010-1234-1234",
  storeId: null,
  streetAddr: "강원도 평창군 봉평면 무야리 23-12",
  detailAddr: "강원 아파트",
  zipcode: 34212,
  imgSrc: process.env.PUBLIC_URL + "/img/defaultProfile.png",
};

const MyPage = (props) => {
  const dispatch = useDispatch();
  // 유저정보 관리 변수

  const [isEditting, setIsEditting] = useState(false);
  const user = useSelector((state) => {
    // console.log(state.userSlice.value);
    return state.userSlice.value;
  });
  // console.log(user);
  // setUserInfo(user);
  const [userInfo, setUserInfo] = useState({
    ...user,
  });

  useEffect(() => {
    const storeUserData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userDataRes = await axios.get(
          process.env.REACT_APP_API_SERVER_URL + "/api/v1/member/",
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              token: accessToken,
            },
          }
        );
        const userInfo = userDataRes;
        // console.log(userDataRes);
        // console.log(userInfo);
        // setUserInfo(userInfo);
      } catch (err) {
        console.log(err);
      }

      // setUserInfo(userDataRes.data);
    };
    // const testMemberId = 1;
    storeUserData();
    // const fetchedInfo = fetchUserInfo(testMemberId);
    // console.log(fetchedInfo);
  }, []);

  const toggleIsEditting = (e) => {
    e.preventDefault();
    setIsEditting((prev) => !prev);
  };

  const editInfoHandler = (e) => {
    e.preventDefault();

    alert("사용자 정보가 수정되었습니다.");
    console.log(userInfo);
    setIsEditting((prev) => !prev);
  };

  const userInfoChangeHandler = (name, value) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const cancelInfoEditHandler = () => {
    setUserInfo((prev) => {
      return {
        ...userInfo,
      };
    });

    setIsEditting((prev) => !prev);

    alert("수정이 취소되었습니다.");
  };

  return (
    <div>
      <MyPageHeader
        profileImg={userInfo.imgSrc}
        userInfo={userInfo}
        isEditting={isEditting}
        userInfoChangeHandler={userInfoChangeHandler}
      />
      <Outlet
        context={{
          userInfo: userInfo,
          isEditting,
          toggleIsEditting,
          editInfoHandler,
          userInfoChangeHandler,
          cancelInfoEditHandler,
        }}
      />
    </div>
  );
};

export default MyPage;
