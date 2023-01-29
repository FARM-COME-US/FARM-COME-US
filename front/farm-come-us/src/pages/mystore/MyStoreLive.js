import React from "react";

import classes from "./style/MyStoreLive.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreLiveList from "../../components/mystore/MyStoreLiveList";
import AddButton from "../../components/mystore/AddButton";

const DUMMY_LIVE_LIST = [
  {
    liveId: 1,
    liveTitle: "신선한 유기농 강원 고랭 배추",
    productId: 1,
    productName: "강원도 고랭지 배추",
    stock: 140,
    price: 14000,
    unit: 1,
    startDate: new Date(2022, 1, 10, 23, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
];

const MyStoreLive = () => {
  const addLiveHandler = () => {
    alert("라이브 추가 이벤트 발생");
    return;
  };

  return (
    <div className={classes.liveContainer}>
      <MyStoreContentTitle text="Live" />
      <MyStoreLiveList lives={DUMMY_LIVE_LIST} />
      <div className={classes.btnBox}>
        <AddButton className={classes.btnAdd} onClick={addLiveHandler} />
      </div>
    </div>
  );
};

export default MyStoreLive;
