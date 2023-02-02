import React from "react";

import classes from "./style/MyStoreInfo.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreInfoList from "../../components/mystore/MyStoreInfoList";
import Button from "../../components/common/Button";

const DUMMY_STORE_INFO = {
  storeName: "고랭강원농장",
  storeDesc:
    "저희 농장은 강원도 고산지대에서 재배한 신선한 작물들을 제공합니다.",
  addr: "강원도 평창군 봉평면 무야리 23-12",
  pno: "010-1234-1234",
};

const MyStoreInfo = () => {
  const editInfoHandler = () => {
    alert("스토어 정보 수정 로직");
  };

  return (
    <div className={classes.storeInfo}>
      <MyStoreContentTitle text="스토어 정보" />
      <form>
        <MyStoreInfoList className={classes.infoList} info={DUMMY_STORE_INFO} />
        <Button className={classes.btnEditInfo} onClick={editInfoHandler}>
          스토어 정보 수정
        </Button>
      </form>
    </div>
  );
};

export default MyStoreInfo;
