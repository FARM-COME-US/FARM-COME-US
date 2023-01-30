import React from "react";

import classes from "./style/RunningLive.module.scss";

import LiveList from "../../components/live/LiveList";

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
  },
];

const RunningLive = () => {
  return (
    <div className={classes.liveContainer}>
      <LiveList liveList={LIVE_LIST} isLive={true} />
    </div>
  );
};

export default RunningLive;
