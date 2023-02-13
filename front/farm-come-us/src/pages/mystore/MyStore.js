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
  storeDescription:
    "저희 농장은 강원도 고산지대에서 재배한 신선한 작물들을 제공합니다.",
  storeStreetAddr: "강원도 평창군 봉평면 무야리 23-12",
  storeDetailAddr: "",
  zipcode: 18310,
  detailAddr: "초가집",
  phoneNumber: "010-1234-1234",
  imgSrc: "https://via.placeholder.com/300",
};

const MyStore = () => {
  const location = useLocation();
  // console.log(location);
  const dispatch = useDispatch();
  // console.log(location.state);
  const user = useSelector((state) => state.userSlice.value);
  console.log(user);
  let storeId = useSelector((state) => state.userSlice.store);
  // console.log(storeId);
  // console.log(storeId.data.storeId);

  const [memberId, setMemberId] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    storeId: DUMMY_STORE_INFO.storeId,
    storeName: DUMMY_STORE_INFO.storeName,
    storeDescription: DUMMY_STORE_INFO.storeDescription,
    storeStreetAddr: DUMMY_STORE_INFO.storeStreetAddr,
    storeZipcode: DUMMY_STORE_INFO.storeZipcode,
    storeDetailAddr: DUMMY_STORE_INFO.storeDetailAddr,
    storePhoneNumber: DUMMY_STORE_INFO.storePhoneNumber,
    imgSrc: DUMMY_STORE_INFO.imgSrc,
  });

  const fetchStoreData = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(user);
    console.log(accessToken);
    console.log(user.storeId);

    const res = await axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/api/v1/store/mystore/${user.memberId}`,
      {
        headers: {
          token: accessToken,
        },
      }
    );
    console.log("마이스토어데이터 가져오는 작업을 합니다.");
    setStoreInfo({ imgSrc: res.data.storeImage.savedPath, ...res.data.store });
    console.log({ imgSrc: res.data.storeImage.savedPath, ...res.data.store });
    console.log(`storeID찍히나?${res.data.store.storeId}`);
    // dispatch(userSlice.actions.saveStoreInfo(res.data.store.storeId));
    console.log(res.data);
    // console.log(res.storeImage.savedPath, ...res.data.store);

    return res.data.store;
  };

  useEffect(() => {
    console.log("useEffect실행 데이터 가져옴.");

    setStoreInfo(fetchStoreData());
    // dispatch(userSlice.actions.saveStoreInfo()); // 😀
  }, [storeId]);

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
    console.log("수정된이벤트");
    console.log(storeInfo);

    const request = {
      memberId: storeInfo.memberId,
      storeDeliveryCost: storeInfo.storeDeliveryCost,
      storeDeliveryFree: storeInfo.storeDeliveryFree,
      storeDescription: storeInfo.storeDescription,
      storeDetailAddr: storeInfo.storeDetailAddr,
      storeId: storeInfo.storeId,
      storeImg: storeInfo.imgSrc,
      storeName: storeInfo.storeName,
      storePhoneNumber: storeInfo.storePhoneNumber,
      storeStreetAddr: storeInfo.storeStreetAddr,
      storeZipcode: storeInfo.storeZipcode,
    };

    alert("스토어 정보가 수정되었습니다.");
    console.log(storeInfo);
    setIsEditting((prev) => !prev);
  };

  const cancelInfoEditHandler = () => {
    setStoreInfo((prev) => {
      return {
        storeId: DUMMY_STORE_INFO.storeId,
        storeName: DUMMY_STORE_INFO.storeName,
        storeDescription: DUMMY_STORE_INFO.storeDescription,
        storeStreetAddr: DUMMY_STORE_INFO.storeStreetAddr,
        storeZipcode: DUMMY_STORE_INFO.storeZipcode,
        storeDetailAddr: DUMMY_STORE_INFO.storeDetailAddr,
        storePhoneNumber: DUMMY_STORE_INFO.storePhoneNumber,
        imgSrc: DUMMY_STORE_INFO.imgSrc,
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
