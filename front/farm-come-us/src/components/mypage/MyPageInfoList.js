import React, { useState, useEffect } from "react";

import classes from "./style/MyPageInfoList.module.scss";

import MyStoreInput from "./MyPageInput";
import DaumPostcodeEmbed from "react-daum-postcode";

const MyStoreInfoList = (props) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (props.isEditting) {
      const myInput = document.querySelector("#myInput");
      myInput.focus();
    }
  }, [props.isEditting]);

  const selectAddress = (data) => {
    props.onChange("streetAddr", data.roadAddress);
    props.onChange("zipcode", data.zonecode);
    setOpenModal(!openModal);
  };

  const onInputChangeHandler = (e) => {
    props.onChange(e.target.name, e.target.value);
  };

  const onEditAddr = () => {
    if (props.isEditting) {
      return setOpenModal(!openModal);
    }
  };

  return (
    <ul className={classes.infoList}>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="닉네임"
          value={props.info.nickname}
          readOnly={!props.isEditting}
          onChange={onInputChangeHandler}
          name="nickname"
          id="myInput"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="성명"
          value={props.info.name}
          readOnly={!props.isEditting}
          onChange={onInputChangeHandler}
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
          onChange={onInputChangeHandler}
          name="pno"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="주소"
          value={props.info.streetAddr}
          readOnly={!props.isEditting}
          onChange={onInputChangeHandler}
          name="streetAddr"
          onFocus={() => {
            onEditAddr();
          }}
          onClick={() => {
            onEditAddr();
          }}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="우편번호"
          value={props.info.zipcode}
          readOnly={!props.isEditting}
          onChange={onInputChangeHandler}
          name="zipcode"
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="상세주소"
          value={props.info.detailAddr}
          readOnly={!props.isEditting}
          onChange={onInputChangeHandler}
          name="detailAddr"
        />
      </li>
      {openModal && (
        <div className={`${classes.modal} ${classes.openModal}`}>
          <DaumPostcodeEmbed
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="동서대로 98-39" // 팝업을 열때 기본적으로 입력되는 검색어. 대전캠주소 해놨음.
          />
        </div>
      )}
      {openModal && (
        <div
          className={classes.backdrop}
          onClick={() => {
            setOpenModal(false);
          }}
        />
      )}
    </ul>
  );
};

export default MyStoreInfoList;
