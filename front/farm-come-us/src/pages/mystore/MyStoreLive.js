import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import classes from "./style/MyStoreLive.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreLiveList from "../../components/mystore/MyStoreLiveList";
import AddButton from "../../components/mystore/AddButton";
import AddLiveModal from "../../components/mystore/AddLiveModal";

const DUMMY_LIVE_LIST = [
  {
    liveId: "1",
    title: "신선한 유기농 강원 고랭 배추",
    productId: 1,
    productName: "강원도 고랭지 배추",
    storeName: "강원고랭",
    stock: 140,
    discount: 14,
    price: 14000,
    count: 1,
    unit: "개",
    startDate: new Date(2023, 3, 21, 23, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
  {
    liveId: "sessionB",
    title: "신선한 유기농 강원 고랭 배추",
    productId: 2,
    productName: "강원도 고랭지 배추",
    storeName: "강원고랭",
    stock: 140,
    discount: 14,
    price: 14000,
    count: 1,
    unit: "개",
    startDate: new Date(2023, 0, 30, 6, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
];

const MyStoreLive = () => {
  const { storeInfo } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionInfo, setSessionInfo] = useState({
    id: "sessionA",
    username: "Participant" + Math.floor(Math.random() * 100),
  });
  const [newLiveInfo, setNewLiveInfo] = useState({
    itemId: "",
    liveDiscount: 0,
    liveStart: "",
    liveStock: "",
    liveTitle: "",
    storeId: storeInfo.storeId,
  });

  const navigate = useNavigate();

  /* 기타 메서드 */
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
    console.log(newLiveInfo);
    modalToggleHandler();
    return;
  };

  const newLiveInputChangeHandler = (name, value) => {
    setNewLiveInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const startLiveHandler = (liveInfo) => {
    const endDate = new Date(liveInfo.startDate.getTime() + 1 * 60 * 60 * 1000);
    const today = new Date();

    const isLiveEnd = today.getTime() >= endDate.getTime() ? true : false;
    if (isLiveEnd) {
      alert("이미 종료된 라이브입니다.");
    } else {
      const flag = window.confirm("시작?");
      if (!flag) return;

      setSessionInfo({
        id: liveInfo.liveId + "",
        username: sessionInfo.username,
      });

      navigate("/broadcast", {
        state: {
          id: liveInfo.liveId + "",
          username: sessionInfo.username,
          liveInfo: liveInfo,
          isPublisher: true,
        },
      });
    }
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
          newLiveInfo={newLiveInfo}
          onToggleModal={modalToggleHandler}
          onInputChange={newLiveInputChangeHandler}
          onSubmit={addLiveHandler}
          onClick={addLiveHandler}
        />
      ) : null}
    </div>
  );
};

export default MyStoreLive;
