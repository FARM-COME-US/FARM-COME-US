import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";

import classes from "./style/LivePreview.module.scss";

import PreviewHeader from "../../components/preview/PreviewHeader";
import LiveList from "../../components/live/LiveList";
import ProductList from "../../components/preview/ProductList";
import Loading from "../../components/common/Loading";

import { MdOutlineLiveTv } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import { fetchLiveSession, fetchLiveSessions } from "../../utils/api/ov-http";
import {
  fetchRunningLiveList,
  fetchScheduledLiveList,
} from "../../utils/api/live-http";
import { fetchProductList } from "../../utils/api/product-http";

// 더미 데이터
const LIVE_LIST = [
  {
    liveId: 1,
    storeId: 1,
    storeName: "강원 고랭 배추",
    productId: 1,
    productName: "강원도 고랭지 배추",
    discount: 14,
    price: 10800,
    stock: 120,
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
    stock: 120,
    unit: "개",
    sessionId: 2,
  },
  {
    liveId: 3,
    storeId: 3,
    storeName: "강원 고랭 배추",
    productId: 3,
    productName: "강원도 고랭지 배추",
    discount: 14,
    stock: 120,
    price: 10800,
    unit: "개",
    sessionId: 3,
  },
  {
    liveId: 4,
    storeId: 4,
    storeName: "제주 당근당근",
    productId: 4,
    productName: "[서귀포] 신선 당근",
    discount: 16,
    stock: 120,
    price: 13200,
    unit: "개",
    sessionId: 4,
  },
];

const RESERVED_LIVE_LIST = [
  {
    liveId: 1,
    storeId: 1,
    storeName: "강원 고랭 배추",
    productId: 1,
    productName: "강원도 고랭지 배추",
    discount: 14,
    price: 10800,
    unit: 1,
    time: new Date(),
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
    time: new Date(),
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
    time: new Date(),
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
    time: new Date(),
  },
];

const LivePreview = () => {
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
    data: runningLiveData,
    errorRll,
  } = useHttp(fetchRunningLiveList, true);

  const {
    sendRequest: getScheduledLiveInfo,
    status: sllStatus,
    data: scheduledLiveData,
    errorSll,
  } = useHttp(fetchScheduledLiveList, true);

  const {
    sendRequest: getItemList,
    status: itemStatus,
    data: itemList,
    errorItem,
  } = useHttp(fetchProductList, true);

  useEffect(() => {
    getLiveSessions();
  }, [getLiveSessions]);

  useEffect(() => {
    getRunningLiveInfo(0);
  }, [getRunningLiveInfo]);

  useEffect(() => {
    getScheduledLiveInfo(0);
  }, [getScheduledLiveInfo]);

  useEffect(() => {
    const data = {
      category: "전체",
      itemName: "",
      subCategory: "전체",
      page: 0,
      size: 8,
    };
    getItemList(data);
    console.log(itemList);
  }, [getItemList]);

  const liveRoomEnterHandler = async (liveInfo) => {
    const data = await fetchLiveSession(liveInfo.sessionId);

    if (!data) {
      alert("진행 중인 라이브가 아닙니다.");
      getLiveSessions();
      return;
    }
    const sessionId = data.sessionId;
    alert(`Room_id : ${sessionId}`);
    navigate("/broadcast", {
      state: {
        id: sessionId,
        username: "Participant" + Math.floor(Math.random() * 100),
        liveInfo: liveInfo,
      },
    });
  };

  const moveMorePageHandler = (uri) => {
    navigate(uri);
  };

  return (
    <div className={classes.container}>
      {/* 라이브 목록 */}
      <PreviewHeader
        className={`${classes.header} title`}
        moveMorePage={() => moveMorePageHandler("/livestore/running")}
        text="진행 중인 라이브"
        logo={<MdOutlineLiveTv className={`${classes.logo} ${classes.red}`} />}
      />
      {ovStatus === "pending" || rllStatus === "pending" ? (
        <Loading className={classes.loading} />
      ) : (
        <LiveList
          liveList={LIVE_LIST}
          sessionList={sessionList}
          isLive={true}
          isPreview={true}
          onEnter={liveRoomEnterHandler}
        />
      )}
      <div className={classes.horzLine} />
      {/* 예정된 라이브 */}
      <PreviewHeader
        className={`${classes.header} title`}
        moveMorePage={() => moveMorePageHandler("/livestore/scheduled")}
        text="라이브 예정"
        logo={<MdOutlineCalendarToday className={`${classes.logo}`} />}
      />
      {sllStatus === "pending" ? (
        <Loading className={classes.loading} />
      ) : (
        <LiveList
          liveList={scheduledLiveData.liveOffList}
          isLive={false}
          isPreview={true}
        />
      )}
      <div className={classes.horzLine} />
      {/* 상품 최신순 */}
      <PreviewHeader
        className={`${classes.header} title`}
        moveMorePage={() => moveMorePageHandler("/products")}
        text="상품 최신순"
        logo={<MdStorefront className={`${classes.logo}`} />}
      />
      {itemStatus === "pending" ? (
        <Loading className={classes.loading} />
      ) : (
        <ProductList productList={itemList.itemInfoList} isPreview={true} />
      )}
    </div>
  );
};

export default LivePreview;
