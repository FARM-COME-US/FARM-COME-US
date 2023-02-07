import React from "react";
import classes from "./style/StoreLive.module.scss";
import StoreLiveList from "../../components/store/StoreLiveList";
import { useLocation } from "react-router-dom";

const DUMMY_LIVE_LIST = [
  {
    liveId: 1,
    productId: 1,
    storeId: 1,
    productName: "강원도 고랭지 배추",
    productOption: 1,
    productAmount: 140,
    productPrice: 14000,
    liveDate: "2022.12.20 08:00 ~ 09:00",
  },

  {
    liveId: 2,
    productId: 2,
    storeId: 1,
    productName: "봉평 메밀 가루",
    productOption: 1,
    productAmount: 20,
    productPrice: 22000,
    liveDate: "2022.11.30 04:00 ~ 05:00",
  },

  {
    liveId: 3,
    productId: 3,
    storeId: 2,
    productName: "강원도 메밀 가루",
    productOption: 1,
    productAmount: 20,
    productPrice: 25000,
    liveDate: "2022.11.29 04:00 ~ 05:00",
  },
  {
    liveId: 4,
    productId: 4,
    storeId: 2,
    productName: "봉평 고랭지 배추",
    productOption: 1,
    productAmount: 20,
    productPrice: 25000,
    liveDate: "2022.11.29 04:00 ~ 05:00",
  },
  {
    liveId: 5,
    productId: 5,
    storeId: 3,
    productName: "보성 녹차",
    productOption: 1,
    productAmount: 20,
    productPrice: 25000,
    liveDate: "2022.11.29 04:00 ~ 05:00",
  },
  {
    liveId: 6,
    productId: 6,
    storeId: 3,
    productName: "보성 메밀",
    productOption: 1,
    productAmount: 20,
    productPrice: 25000,
    liveDate: "2022.11.29 04:00 ~ 05:00",
  },
];

const StoreLive = () => {
  const location = useLocation();

  const liveList = DUMMY_LIVE_LIST.filter(
    (item) => item.storeId === location.state.storeId
  );

  return (
    <div className={classes.container}>
      <StoreLiveList liveList={liveList}></StoreLiveList>
    </div>
  );
};

export default StoreLive;
