import React from "react";

import classes from "./style/LivePreviewList.module.scss";

import LiveItem from "./LiveItem";

// 더미 데이터
const liveList = [
  {
    liveId: 1,
    storeId: 1,
    StoreName: "강원 고랭 배추",
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
];

const LivePreviewList = (props) => {
  return (
    <ul className={`${classes.liveList}`}>
      {liveList.map((item) => (
        <li>
          <LiveItem title={item.productName} />
        </li>
      ))}
    </ul>
  );
};

export default LivePreviewList;
