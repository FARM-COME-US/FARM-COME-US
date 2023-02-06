import React from "react";

import classes from "./style/MyStoreLiveInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const MyStoreLiveInfoList = (props) => {
  return (
    <ul className={`${classes.infoList} ${props.className}`}>
      <li className={classes.infoItem}>
        <MyStoreInput label="상품명" type="text" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="가격" type="number" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="수량" type="number" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="상품 상세정보" type="text" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="할인율" type="number" min="0" max="100" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="Live 시작시간" type="datetime-local" />
      </li>
    </ul>
  );
};

export default MyStoreLiveInfoList;
