import React, { useState } from "react";
import classes from "./style/MyStoreInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const MyStoreCreateInfoList = (props) => {
  // const []
  const validityHandler = () => {};
  return (
    <ul className={classes.infoList}>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 이름"
          //   value={props.info.storeName}
          readOnly={false}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 설명"
          //   value={props.info.storeDesc}
          readOnly={false}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="농장 주소"
          //   value={props.info.addr}
          readOnly={false}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="대표 번호"
          //   value={props.info.pno}
          readOnly={false}
        />
      </li>
      <li>
        <div>사업자 번호</div>
        <div>사업자 번호 입력</div>
        <div onClick={validityHandler}>확인</div>
      </li>
      <li>
        <div>배송비 미발생 최소 금액</div>
        <div>단위 : 원</div>
      </li>
    </ul>
  );
};

export default MyStoreCreateInfoList;
