import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createStore } from "../../utils/api/store-http";

import classes from "./style/MyStoreCreate.module.scss";

import MyStoreHeader from "../../components/mystore/MyStoreHeader";
import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreCreateInfoList from "../../components/mystore/MyStoreCreateInfoList";
import Button from "../../components/common/Button";

const MyStoreCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = location.state;
  const [storeInfo, setStoreInfo] = useState({
    storeId: userInfo.storeId, // 사용자 정보에 storeId가 있다면 가져옴
    storeName: "",
    desc: "",
    addr: "",
    pno: "",
    minDeliveryPrice: "",
    imgSrc: "",
  });

  // 마이스토어가 있는데 들어왔으면 마이스토어로 redirect
  useEffect(() => {
    if (userInfo.storeId) {
      navigate("/mystore", { replace: true });
    }
  }, []);

  const createStoreHandler = (e) => {
    e.preventDefault();
    alert("스토어 생성로직");
    createStore(storeInfo);
  };

  const storeInfoChangeHandler = (name, value) => {
    setStoreInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className={classes.storeInfo}>
      <MyStoreHeader
        info={storeInfo}
        onStoreInfoChange={storeInfoChangeHandler}
      />
      <MyStoreContentTitle text="스토어 정보 입력" />
      <form>
        <MyStoreCreateInfoList
          className={classes.infoList}
          info={storeInfo}
          onStoreInfoChange={storeInfoChangeHandler}
        />
        <Button className={classes.btnEditInfo} onClick={createStoreHandler}>
          마이 스토어 생성
        </Button>
      </form>
    </div>
  );
};

export default MyStoreCreate;
