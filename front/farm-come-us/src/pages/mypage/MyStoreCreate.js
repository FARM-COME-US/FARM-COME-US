import React from "react";

import classes from "./style/MyStoreCreate.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreCreateInfoList from "../../components/mypage/MyStoreCreateInfoList";
import Button from "../../components/common/Button";

const DUMMY_STORE_INFO = {
  storeName: "고랭강원농장",
  storeDesc:
    "저희 농장은 강원도 고산지대에서 재배한 신선한 작물들을 제공합니다.",
  addr: "강원도 평창군 봉평면 무야리 23-12",
  pno: "010-1234-1234",
};

const MyStoreCreate = () => {
  const createStoreHandler = () => {
    alert("스토어 생성로직");
  };

  return (
    <div className={classes.storeInfo}>
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
