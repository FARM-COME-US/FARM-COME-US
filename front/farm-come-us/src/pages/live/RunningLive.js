import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLiveSession, fetchLiveSessions } from "../../utils/api/ov-http";
import { fetchRunningLiveList } from "../../utils/api/live-http";

import useHttp from "../../hooks/use-http";

import classes from "./style/RunningLive.module.scss";

import LiveList from "../../components/live/LiveList";
import Loading from "../../components/common/Loading";

const LIVE_LIST = [
  {
    liveId: 1,
    storeId: 1,
    storeName: "강원 고랭 배추",
    productId: 1,
    productName: "강원도 고랭지 배추",
    discount: 14,
    price: 10800,
    unit: 1,
    sessionId: 1,
  },
  {
    liveId: 2,
    storeId: 2,
    storeName: "제주 당근당근",
    productId: 2,
    productName: "[서귀포] 신선 당근",
    discount: 12,
    price: 6200,
    unit: 1,
    sessionId: 2,
  },
  {
    liveId: 3,
    storeId: 3,
    storeName: "강원 고랭 배추",
    productId: 3,
    productName: "강원도 고랭지 배추",
    discount: 14,
    price: 10800,
    unit: 3,
    sessionId: 3,
  },
  {
    liveId: 4,
    storeId: 4,
    storeName: "제주 당근당근",
    productId: 4,
    productName: "[서귀포] 신선 당근",
    discount: 16,
    price: 13200,
    unit: 1,
    sessionId: 4,
  },
  {
    liveId: 5,
    storeId: 5,
    storeName: "강원 고랭 배추",
    productId: 5,
    productName: "강원도 고랭지 배추",
    discount: 14,
    price: 10800,
    unit: 3,
    sessionId: 5,
  },
  {
    liveId: 6,
    storeId: 6,
    storeName: "제주 당근당근",
    productId: 6,
    productName: "[서귀포] 신선 당근",
    discount: 16,
    price: 13200,
    unit: 1,
    sessionId: 6,
  },
];

const RunningLive = () => {
  const navigate = useNavigate();

  const {
    sendRequest: getLiveSessions,
    status: ovStatus,
    data: sessionList,
    errorOv,
  } = useHttp(fetchLiveSessions, true);

  const {
    sendRequest: getRunningLiveInfo,
    status: rllStatus,
    data: runningLiveList,
    errorRll,
  } = useHttp(fetchRunningLiveList, true);

  useEffect(() => {
    getLiveSessions();
  }, [getLiveSessions]);

  useEffect(() => {
    getRunningLiveInfo();
  }, [getRunningLiveInfo]);

  const liveRoomEnterHandler = async (liveInfo) => {
    const data = await fetchLiveSession(liveInfo.sessionId);
    if (!data) {
      alert("진행 중인 라이브가 아닙니다.");
      getLiveSessions();
      return;
    }
    const sessionId = data.sessionId;
    alert(`${sessionId}`);
    navigate("/broadcast", {
      state: {
        id: sessionId,
        username: "Participant" + Math.floor(Math.random() * 100),
        liveInfo: liveInfo,
      },
    });
  };

  return (
    <div className={classes.liveContainer}>
      {ovStatus === "pending" || rllStatus === "pending" ? (
        <Loading className={classes.loading} />
      ) : (
        <LiveList
          liveList={LIVE_LIST}
          sessionList={sessionList}
          isLive={true}
          onEnter={liveRoomEnterHandler}
        />
      )}
    </div>
  );
};

export default RunningLive;
