import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCreateStore, fetchStoreDetail } from "../../utils/api/store-http";

import classes from "./style/MyStoreCreate.module.scss";

import MyStoreHeader from "../../components/mystore/MyStoreHeader";
import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreCreateInfoList from "../../components/mystore/MyStoreCreateInfoList";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";

const MyStoreCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = location.state;
  const [storeInfo, setStoreInfo] = useState({
    storeName: "",
    desc: "",
    streetAddr: "",
    detailAddr: "",
    zipcode: "",
    phoneNumber: "",
    imgSrc: "",
    uploadFile: "",
    deliveryCost: "",
    deliveryFree: "",
  });
  const [storeNameIsValid, setStoreNameIsValid] = useState();

  // 마이스토어가 있는데 들어왔으면 마이스토어로 redirect
  useEffect(() => {
    if (userInfo.storeId) {
      navigate("/mystore", { replace: true });
    }
  }, []);

  const user = useSelector((state) => state.userSlice.value);
  // console.log(user);

  const createStoreHandler = (e) => {
    e.preventDefault();
    // alert("스토어 생성로직 - 멤버 id 더미 데이터 ");
    fetchCreateStore(storeInfo, user);
    console.log("여기까지는 오나?");
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
