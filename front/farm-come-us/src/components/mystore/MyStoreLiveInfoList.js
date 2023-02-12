import React from "react";

import classes from "./style/MyStoreLiveInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const MyStoreLiveInfoList = (props) => {
  return (
    <ul className={`${classes.infoList} ${props.className}`}>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="라이브 제목"
          type="text"
          onChange={props.onChange}
          name="liveTitle"
          value={props.newLiveInfo.liveTitle}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="상품명" type="text" onChange={props.onChange} />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="할인율"
          type="number"
          min="0"
          max="100"
          onChange={props.onChange}
          name="liveDiscount"
          value={props.newLiveInfo.liveDiscount}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="가격" type="number" onChange={props.onChange} />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="재고" type="number" onChange={props.onChange} />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="상품 상세정보"
          type="text"
          onChange={props.onChange}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="Live 시작시간"
          type="datetime-local"
          onChange={props.onChange}
          name="liveStart"
          value={props.newLiveInfo.liveStart}
        />
      </li>
    </ul>
  );
};

export default MyStoreLiveInfoList;
