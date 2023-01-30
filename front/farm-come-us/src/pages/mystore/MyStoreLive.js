import React, { useState } from "react";

import classes from "./style/MyStoreLive.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreLiveList from "../../components/mystore/MyStoreLiveList";
import AddButton from "../../components/mystore/AddButton";
import AddLiveModal from "../../components/mystore/AddLiveModal";

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
  {
    liveId: 2,
    liveTitle: "신선한 유기농 강원 고랭 배추",
    productId: 2,
    productName: "강원도 고랭지 배추",
    stock: 140,
    price: 14000,
    unit: 1,
    startDate: new Date(2022, 1, 10, 23, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
];

const MyStoreLive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggleHandler = () => {
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    setIsModalOpen((prev) => !prev);
  };

  const addLiveHandler = (e) => {
    e.preventDefault();
    alert("라이브 추가 이벤트 발생");

    modalToggleHandler();
    return;
  };

  const startLiveHandler = (liveInfo) => {
    console.log(liveInfo);
    alert("라이브 시작");
    return;
  };

  return (
    <div className={classes.liveContainer}>
      <MyStoreContentTitle text="Live" />
      <MyStoreLiveList
        lives={DUMMY_LIVE_LIST}
        startLiveHandler={startLiveHandler}
      />
      <div className={classes.btnBox}>
        <AddButton className={classes.btnAdd} onClick={modalToggleHandler} />
      </div>
      {isModalOpen ? (
        <AddLiveModal
          title="Live 정보 입력"
          className={isModalOpen ? null : "close"}
          onToggleModal={modalToggleHandler}
          onSubmit={addLiveHandler}
          onClick={addLiveHandler}
        />
      ) : null}
    </div>
  );
};

export default MyStoreLive;
