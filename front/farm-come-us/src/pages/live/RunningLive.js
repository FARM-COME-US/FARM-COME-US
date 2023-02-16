import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLiveSession, fetchLiveSessions } from "../../utils/api/ov-http";
import { fetchRunningLiveList } from "../../utils/api/live-http";

import useHttp from "../../hooks/use-http";

import classes from "./style/RunningLive.module.scss";

import LiveList from "../../components/live/LiveList";
import Loading from "../../components/common/Loading";

const RunningLive = () => {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState(0);

  const {
    sendRequest: getLiveSessions,
    status: ovStatus,
    data: sessionList,
    errorOv,
  } = useHttp(fetchLiveSessions, true);

  const {
    sendRequest: getRunningLiveInfo,
    status: rllStatus,
    data: runningLiveData,
    errorRll,
  } = useHttp(fetchRunningLiveList, true);

  useEffect(() => {
    getLiveSessions();
  }, [getLiveSessions]);

  useEffect(() => {
    getRunningLiveInfo(currPage);
  }, [getRunningLiveInfo]);

  const liveRoomEnterHandler = async (liveInfo) => {
    console.log(liveInfo);
    fetchLiveSession(liveInfo.liveId)
      .then((res) => {
        console.log(res);
        const sessionId = res.liveId;
        navigate("/broadcast", {
          state: {
            id: sessionId,
            username: "Participant" + Math.floor(Math.random() * 100),
            liveInfo: liveInfo,
          },
        });
      })
      .catch(() => {
        alert("진행 중인 라이브가 아닙니다.");
        getLiveSessions();
      });
  };

  return (
    <div className={classes.liveContainer}>
      {ovStatus === "pending" || rllStatus === "pending" ? (
        <Loading className={classes.loading} />
      ) : (
        <LiveList
          liveList={runningLiveData.liveOnList}
          hasNextPage={runningLiveData.hasNextPage}
          sessionList={sessionList}
          isLive={true}
          onEnter={liveRoomEnterHandler}
        />
      )}
    </div>
  );
};

export default RunningLive;
