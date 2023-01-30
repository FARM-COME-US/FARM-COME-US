import React from "react";

import classes from "./style/MyStoreInfoList.module.scss";

import MyStoreInfoItem from "./MyStoreInfoItem";

const MyStoreInfoList = (props) => {
  return (
    <ul className={classes.infoList}>
      <li className={classes.infoItem}>
        <MyStoreInfoItem label="스토어 이름" value={props.info.storeName} />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInfoItem label="스토어 설명" value={props.info.storeDesc} />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInfoItem label="농장 주소" value={props.info.addr} />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInfoItem label="대표 번호" value={props.info.pno} />
      </li>
    </ul>
  );
};

export default MyStoreInfoList;
