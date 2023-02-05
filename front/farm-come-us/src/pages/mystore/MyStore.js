import React from "react";
import { Outlet } from "react-router-dom";

import classes from "./style/MyStore.module.scss";

import MyStoreHeader from "../../components/mystore/MyStoreHeader";

const DUMMY_STORE_INFO = {
  storeId: 1,
  storeName: "고랭강원농장",
  desc: "저희 농장은 강원도 고산지대에서 재배한 신선한 작물들을 제공합니다.",
  addr: "강원도 평창군 봉평면 무야리 23-12",
  pno: "010-1234-1234",
  imgSrc: "https://via.placeholder.com/300",
};

const MyStore = () => {
  return (
    <div className={classes.mystore}>
      <MyStoreHeader info={DUMMY_STORE_INFO} />
      <div className={classes.container}>
        <Outlet context={{ info: DUMMY_STORE_INFO }} />
      </div>
    </div>
  );
};

export default MyStore;
