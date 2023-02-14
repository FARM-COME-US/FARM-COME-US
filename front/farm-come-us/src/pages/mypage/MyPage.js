import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MyPageHeader from "../../components/mypage/MyPageHeader";
import { fetchUpdateUserInfo } from "../../utils/api/user-http";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userSlice from "../../reduxStore/userSlice";
import axios from "axios";

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
    imgSrc: "",
    uploadFile: "",
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
        // dispatch(userSlice.actions.login());
        userSlice.actions.login(userDataRes.data.userInfo);
        const userInfo = userDataRes.data.userInfo;
        userInfo["imgSrc"] = userDataRes.data.userImage.savedPath;
        setUserInfo(userInfo);
      } catch (err) {
        console.log(err);
      }
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
    fetchUpdateUserInfo(userInfo)
      .then((res) => {
        alert("사용자 정보가 수정되었습니다.");
      })
      .catch((err) => {
        console.error(err);
      });

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
