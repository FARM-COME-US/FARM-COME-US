import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchStoreLive } from "../../utils/api/live-http";

import classes from "./style/MyStoreLive.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreLiveList from "../../components/mystore/MyStoreLiveList";
import AddButton from "../../components/mystore/AddButton";
import AddLiveModal from "../../components/mystore/AddLiveModal";
import Loading from "../../components/common/Loading";

import useHttp from "../../hooks/use-http";

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
    id: storeInfo.memberId,
    username: storeInfo.storeName,
  });

  const navigate = useNavigate();

  const {
    sendRequest: getStoreLive,
    status: status,
    data: liveList,
    error,
  } = useHttp(fetchStoreLive, true);

  useEffect(() => {
    if (storeInfo.storeId) {
      const params = {
        storeId: storeInfo.storeId,
        page: 0,
        size: 100,
      };
      getStoreLive(params);
    }
  }, [storeInfo.storeId, getStoreLive]);

  /* 기타 메서드 */
  const modalToggleHandler = () => {
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    setIsModalOpen((prev) => !prev);
  };

  const startLiveHandler = (liveInfo) => {
    const endDate = new Date(
      new Date(liveInfo.liveStart).getTime() + 1 * 60 * 60 * 1000
    );
    const today = new Date();

    const isLiveEnd = today.getTime() >= endDate.getTime() ? true : false;
    if (isLiveEnd) {
      alert("이미 종료된 라이브입니다.");
    } else {
      const flag = window.confirm("시작?");
      if (!flag) return;

      setSessionInfo({
        id: liveInfo.liveId + "" + storeInfo.storeName,
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
      {status === "pending" && !liveList ? (
        <Loading className={classes.loading} />
      ) : (
        <MyStoreLiveList lives={liveList} startLiveHandler={startLiveHandler} />
      )}

      <div className={classes.btnBox}>
        <AddButton className={classes.btnAdd} onClick={modalToggleHandler} />
      </div>
      {isModalOpen ? (
        <AddLiveModal
          title="Live 정보 입력"
          className={isModalOpen ? null : "close"}
          storeInfo={storeInfo}
          onToggleModal={modalToggleHandler}
        />
      ) : null}
    </div>
  );
};

export default MyStoreLive;
