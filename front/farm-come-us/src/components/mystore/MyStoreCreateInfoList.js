import React, { useState } from "react";
import classes from "./style/MyStoreInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const MyStoreCreateInfoList = (props) => {
  const validityHandler = () => {};

  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    props.onStoreInfoChange(e.target.name, e.target.value);
  };

  return (
    <ul className={classes.infoList}>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 이름"
          value={props.info.storeName}
          readOnly={false}
          name="storeName"
          onChange={onInputChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 설명"
          value={props.info.desc}
          readOnly={false}
          name="desc"
          onChange={onInputChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="농장 주소"
          value={props.info.addr}
          readOnly={false}
          name="addr"
          onChange={onInputChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="대표 번호"
          value={props.info.pno}
          readOnly={false}
          name="pno"
          onChange={onInputChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="배송비 미발생 최소 금액"
          value={props.info.minDeliveryPrice}
          readOnly={false}
          name="minDeliveryPrice"
          onChange={onInputChangeHandler}
        />
      </li>
    </ul>
  );
};

export default MyStoreCreateInfoList;
