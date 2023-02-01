import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    startDate: new Date(2023, 1, 10, 23, 0, 0),
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
    startDate: new Date(2023, 0, 30, 6, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
];

const MyStoreLive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionInfo, setSessionInfo] = useState({
    id: null,
    username: null,
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
    alert("라이브 추가 이벤트 발생");

    modalToggleHandler();
    return;
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
        username: "KEVIN",
      });
      // alert("라이브 시작 로직 구현");
      navigate("/broadcast", {
        state: {
          id: sessionInfo.id,
          username: sessionInfo.username,
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
          onToggleModal={modalToggleHandler}
          onSubmit={addLiveHandler}
          onClick={addLiveHandler}
        />
      ) : null}
    </div>
  );
};

export default MyStoreLive;
