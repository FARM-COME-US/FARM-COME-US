import React, { useEffect } from "react";

import classes from "./style/MyPageInfoList.module.scss";

import MyStoreInput from "./MyPageInput";

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
          label="닉네임"
          value={props.info.nickname}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="nickname"
          id="myInput"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="성명"
          value={props.info.name}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="name"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="이메일"
          value={props.info.email}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="email"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="전화번호"
          value={props.info.pno}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="pno"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="주소"
          value={props.info.addr}
          readOnly={!props.isEditting}
          onChange={props.onChange}
          name="addr"
        />
      </li>
    </ul>
  );
};

export default MyStoreInfoList;
