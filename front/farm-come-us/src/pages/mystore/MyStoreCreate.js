import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./style/MyStoreCreate.module.scss";

import MyStoreHeader from "../../components/mystore/MyStoreHeader";
import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreCreateInfoList from "../../components/mystore/MyStoreCreateInfoList";
import Button from "../../components/common/Button";

const DUMMY_STORE_INFO = {
  storeName: "고랭강원농장",
  storeDesc:
    "저희 농장은 강원도 고산지대에서 재배한 신선한 작물들을 제공합니다.",
  addr: "강원도 평창군 봉평면 무야리 23-12",
  pno: "010-1234-1234",
};

const MyStoreCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = location.state;
  const [storeInfo, setStoreInfo] = useState({
    storeId: userInfo.storeId, // 사용자 정보에 storeId가 있다면 가져옴
    storeName: null,
    desc: null,
    addr: null,
    pno: null,
    imgSrc: null,
  });

  // 마이스토어가 있는데 들어왔으면 마이스토어로 redirect
  useEffect(() => {
    if (userInfo.storeId) {
      navigate("/mystore", { replace: true });
    }
  }, []);

  const createStoreHandler = () => {
    alert("스토어 생성로직");
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
          info={DUMMY_STORE_INFO}
        />
        <Button className={classes.btnEditInfo} onClick={createStoreHandler}>
          마이 스토어 생성
        </Button>
      </form>
    </div>
  );
};

export default MyStoreCreate;
