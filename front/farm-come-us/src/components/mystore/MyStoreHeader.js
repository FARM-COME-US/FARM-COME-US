import React from "react";

import classes from "./style/MyStoreHeader.module.scss";

import { MdAddCircle } from "react-icons/md";
import MyStoreHeaderInfo from "./MyStoreHeaderInfo";
import MyStoreMenu from "./MyStoreMenu";

const DUMMY_STORE_INFO = {
  storeName: "고랭강원농장",
  desc: "저희 농장은 강원도 고산 지대에서 재배한 신선한 작물들을 제공합니다",
};

const MyStoreHeader = () => {
  const addBgImageHandler = () => {
    alert("이미지 추가 이벤트");
    return;
  };

  return (
    <div className={classes.storeHeader}>
      <div className={classes.headerBg}>
        <div className={classes.backdrop}></div>
        <img src="https://via.placeholder.com/300" alt="header-bg" />
      </div>
      <div className={classes.header}>
        <MdAddCircle className={classes.btnAddBg} onClick={addBgImageHandler} />
        <MyStoreHeaderInfo
          storeName={DUMMY_STORE_INFO.storeName}
          desc={DUMMY_STORE_INFO.desc}
        />
        <MyStoreMenu />
      </div>
    </div>
  );
};

export default MyStoreHeader;
