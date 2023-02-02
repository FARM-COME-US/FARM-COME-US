import React from "react";
import classes from "./style/StoreLive.module.scss";
import StoreLiveList from "../../components/store/StoreLiveList";

const LIVE_LIST = [
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
    productId: 2,
    storeId: 1,
    productName: "봉평 메밀 가루",
    productOption: 1,
    productAmount: 20,
    productPrice: 25000,
    liveDate: "2022.11.29 04:00 ~ 05:00",
  },
];

const StoreLive = () => {
  return (
    <div className={classes.container}>
      <StoreLiveList liveList={LIVE_LIST}></StoreLiveList>
    </div>
  );
};

export default StoreLive;
