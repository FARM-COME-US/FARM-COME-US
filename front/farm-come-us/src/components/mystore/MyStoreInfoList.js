import React, { useEffect } from "react";

import classes from "./style/MyStoreInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const MyStoreInfoList = (props) => {
  useEffect(() => {
    if (props.isEditting) {
      const myInput = document.querySelector("#myInput");
      myInput.focus();
    }
  }, [props.isEditting]);

  return (
    <ul className={classes.infoList}>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 이름"
          value={props.info.storeName}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="storeName"
          id="myInput"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="스토어 설명"
          value={props.info.desc}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="desc"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="농장 주소"
          value={props.info.addr}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="addr"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="대표 번호"
          value={props.info.pno}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="pno"
        />
      </li>
    </ul>
  );
};

export default MyStoreInfoList;
