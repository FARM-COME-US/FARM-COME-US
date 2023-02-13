import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { fetchCreateStore, fetchStoreDetail } from "../../utils/api/store-http";
import classes from "./style/MyStoreCreate.module.scss";

import { useDispatch } from "react-redux";
import MyStoreHeader from "../../components/mystore/MyStoreHeader";
import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreCreateInfoList from "../../components/mystore/MyStoreCreateInfoList";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import userSlice from "../../reduxStore/userSlice";
import axios from "axios";

const MyStoreCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = location.state;
  const [storeInfo, setStoreInfo] = useState({
    memberId: "",
    storeDeliveryCost: "",
    storeDeliveryFree: "",
    storeDescription: "",
    storeDetailAddr: "",
    storeImg: "",
    storeName: "",
<<<<<<< HEAD
    storePhoneNumber: "",
    storeStreetAddr: "",
    storeZipcode: "",

    // storeName: "",
    // desc: "",
    // streetAddr: "",
    // detailAddr: "",
    // zipcode: "",
    // phoneNumber: "",
    // imgSrc: "",
    // uploadFile: "",
    // deliveryCost: "",
    // deliveryFree: "",
=======
    storeDescription: "",
    desc: "",
    streetAddr: "",
    detailAddr: "",
    zipcode: "",
    phoneNumber: "",
    imgSrc: "",
    filename: "",
    uploadFile: "",
    deliveryCost: "",
    deliveryFree: "",
>>>>>>> d96e067b3653ee6db30cc5cf1d75586d4bf6c2dd
  });
  const [storeNameIsValid, setStoreNameIsValid] = useState();
  const [storeId, setStoreId] = useState("");
  // 마이스토어가 있는데 들어왔으면 마이스토어로 redirect

  useEffect(() => {
    if (userInfo.storeId) {
      navigate("/mystore", { replace: true });
    }
  }, []);

  const user = useSelector((state) => state.userSlice.value);

  const createStoreHandler = (e) => {
    async function fetchCreateStore(storeInfo, userInfo) {
      const formData = new FormData();
      formData.append("uploadFile", storeInfo.uploadFile);

      const data = {
        memberId: userInfo.memberId,
        storeDeliveryCost: storeInfo.deliveryCost,
        storeDeliveryFree: storeInfo.deliveryFree,
        storeDescription: storeInfo.storeDescription,
        storeDetailAddr: storeInfo.detailAddr,
        storeImg: storeInfo.filename,
        storeName: storeInfo.storeName,
        storePhoneNumber: storeInfo.phoneNumber,
        storeStreetAddr: storeInfo.streetAddr,
        storeZipcode: storeInfo.zipcode,
      };

      formData.append(
        "store",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        })
      );

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: { token: sessionStorage.getItem("accessToken") },
          token: sessionStorage.getItem("accessToken"),
        },
        withCredentials: false,
      };
      console.log("유저정보");
      console.log(userInfo.memberId);
      console.log(data);
      console.log("이 아래에 생성후 응답 바로아래 dispatch");
      dispatch(userSlice.actions.saveStoreInfo());
      axios
        .post(
          process.env.REACT_APP_API_SERVER_URL + "/api/v1/store",
          formData,
          config
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }

    //   try {
    //     const response = axios.post("/api/api/v1/store", formData, config);
    //     console.log(formData);
    //     console.log(response);
    //     return response;
    //   } catch (err) {
    //     console.err(err);
    //   }
    // }

    // 😀 실행부
    e.preventDefault();
    // alert("스토어 생성로직 - 멤버 id 더미 데이터 ");
    try {
      const res = fetchCreateStore(storeInfo, user);
      console.log("스토어 생성 res.data");
      console.log(res.data);
      console.log("스토어 생성 res");
      console.log(res);
      // dispatch(userSlice.actions.saveStoreInfo());
      alert("스토어가 생성되었습니다.");
      // 스토어 생성하고, 내 스토어로 넘김.
    } catch (err) {
      console.log(err);
    }
    navigate("/mystore", { replace: true });
  };

  const storeInfoChangeHandler = (name, value) => {
    setStoreInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validationHandler = () => {
    if (storeInfo.storeName.length > 0) {
      alert("스토어 DB에서 조회해서 스토어 명 중복 체크");
      setStoreNameIsValid((prev) => !prev);
    } else {
      setStoreNameIsValid(undefined);
    }
  };

  return (
    <div className={classes.storeInfo}>
      <MyStoreHeader
        info={storeInfo}
        onStoreInfoChange={storeInfoChangeHandler}
        isEditting={true}
      />
      <MyStoreContentTitle text="스토어 정보 입력" />
      <form>
        <MyStoreCreateInfoList
          className={classes.infoList}
          info={storeInfo}
          onStoreInfoChange={storeInfoChangeHandler}
          onValidationCheck={validationHandler}
          storeNameIsValid={storeNameIsValid}
        />
        <Button className={classes.btnEditInfo} onClick={createStoreHandler}>
          마이 스토어 생성
        </Button>
      </form>
    </div>
  );
};

export default MyStoreCreate;
