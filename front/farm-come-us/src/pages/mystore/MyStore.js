import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./style/MyStore.module.scss";
import { fetchUserInfoWithAccessToken } from "../../utils/api/user-http";
// import { fetchStoreDetail } from "../../utils/api/store-http";
import axios from "axios";
import userSlice from "../../reduxStore/userSlice";
import MyStoreHeader from "../../components/mystore/MyStoreHeader";

const DUMMY_STORE_INFO = {
  storeId: 1,
  storeName: "고랭강원농장",
  desc: "저희 농장은 강원도 고산지대에서 재배한 신선한 작물들을 제공합니다.",
  streetAddr: "강원도 평창군 봉평면 무야리 23-12",
  zipcode: 18310,
  detailAddr: "초가집",
  phoneNumber: "010-1234-1234",
  imgSrc: "https://via.placeholder.com/300",
};

const MyStore = () => {
  const location = useLocation();
  // console.log(location);
  const dispatch = useDispatch();
  console.log(location.state);
  const user = useSelector((state) => state.userSlice.value);
  console.log(user);
  let store = useSelector((state) => state.userSlice.store.data);

  const [memberId, setMenberId] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    storeId: DUMMY_STORE_INFO.storeId,
    storeName: DUMMY_STORE_INFO.storeName,
    desc: DUMMY_STORE_INFO.desc,
    streetAddr: DUMMY_STORE_INFO.streetAddr,
    zipcode: DUMMY_STORE_INFO.zipcode,
    detailAddr: DUMMY_STORE_INFO.detailAddr,
    phoneNumber: DUMMY_STORE_INFO.phoneNumber,
    imgSrc: DUMMY_STORE_INFO.imgSrc,
  });

  const fetchStoreData = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);
    console.log(user.storeId);
    const storeId = user.storeId;
    axios
      .get(
        `${process.env.REACT_APP_API_SERVER_URL}/api/api/v1/store/${storeId}`,
        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((response) => {
        return response.data;
        // setStoreInfo(response.data);
      });
  };

  useEffect(() => {
    if (user.storeId) {
      console.log(fetchStoreData());
      console.log("useEffect실행");
      // setStoreInfo(fetchStoreData());
    }
  }, []);
  // if (user.value.storeId && !storeInfo.storeId) {
  //   // async () => {
  //   async function fetchStoreDetail(storeId) {
  //     try {
  //       const response = axios.get(
  //         `${process.env.REACT_APP_API_SERVER_URL}/api/v1/store/${storeId}`
  //       );

  //       console.log(response);
  //       return response;
  //     } catch (err) {
  //       console.err(err);
  //     }
  //   }

  // const storedata = fetchStoreDetail(user.value.storeId);
  // console.log(storedata);
  // dispatch(userSlice.actions.saveStoreInfo(storedata));
  // setStoreInfo(storedata);
  // };
  // }

  const reLoadUserData = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userDataRes = await axios.get("/api/api/v1/member/", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        token: accessToken,
      },
    });
    dispatch(userSlice.actions.login(userDataRes.data.userInfo));
    return userDataRes.data.userInfo.memberId;
  };

  // let memberId = 0;
  // if (memberId) {
  //   memberId = reLoadUserData();
  //   console.log(memberId);
  // }

  // useEffect(() => {
  //   setMenberId(reLoadUserData());
  // }, [memberId]);

  const onChangeInfoHandler = (name, value) => {
    setStoreInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const editInfoHandler = (e) => {
    e.preventDefault();

    alert("스토어 정보가 수정되었습니다.");
    console.log(storeInfo);
    setIsEditting((prev) => !prev);
  };

  const cancelInfoEditHandler = () => {
    setStoreInfo((prev) => {
      return {
        storeId: DUMMY_STORE_INFO.storeId,
        storeName: DUMMY_STORE_INFO.storeName,
        desc: DUMMY_STORE_INFO.desc,
        phoneNumber: DUMMY_STORE_INFO.phoneNumber,
        streetAddr: DUMMY_STORE_INFO.streetAddr,
        zipcode: DUMMY_STORE_INFO.zipcode,
        detailAddr: DUMMY_STORE_INFO.detailAddr,
      };
    });

    setIsEditting((prev) => !prev);

    alert("수정이 취소되었습니다.");
  };

  const toggleIsEditting = (e) => {
    e.preventDefault();
    setIsEditting((prev) => !prev);
  };

  return (
    <div className={classes.mystore}>
      <MyStoreHeader
        info={storeInfo}
        isEditting={isEditting}
        onStoreInfoChange={onChangeInfoHandler}
      />
      <div className={classes.container}>
        <Outlet
          context={{
            storeInfo,
            isEditting,
            onChangeInfoHandler,
            editInfoHandler,
            cancelInfoEditHandler,
            toggleIsEditting,
          }}
        />
      </div>
    </div>
  );
};

export default MyStore;
