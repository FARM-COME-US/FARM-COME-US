import React from "react";

import classes from "./style/MyStoreInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const MyStoreInfoList = (props) => {
  return (
    <ul className={classes.infoList}>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 이름"
          value={props.info.storeName}
          readOnly={true}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 설명"
          value={props.info.storeDesc}
          readOnly={true}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="농장 주소"
          value={props.info.addr}
          readOnly={true}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="대표 번호"
          value={props.info.pno}
          readOnly={true}
        />
      </li>
    </ul>
  );
};

export default MyStoreInfoList;
