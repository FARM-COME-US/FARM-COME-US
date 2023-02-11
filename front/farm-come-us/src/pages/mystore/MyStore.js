import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import classes from "./style/MyStore.module.scss";

import MyStoreHeader from "../../components/mystore/MyStoreHeader";

const DUMMY_STORE_INFO = {
  storeId: 1,
  storeName: "고랭강원농장",
  desc: "저희 농장은 강원도 고산지대에서 재배한 신선한 작물들을 제공합니다.",
  streetAddr: "강원도 평창군 봉평면 무야리 23-12",
  zipcode: 18310,
  detailAddr: "초가집",
  pno: "010-1234-1234",
  imgSrc: "https://via.placeholder.com/300",
};

const MyStore = () => {
  const [isEditting, setIsEditting] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    storeId: DUMMY_STORE_INFO.storeId,
    storeName: DUMMY_STORE_INFO.storeName,
    desc: DUMMY_STORE_INFO.desc,
    streetAddr: DUMMY_STORE_INFO.streetAddr,
    zipcode: DUMMY_STORE_INFO.zipcode,
    detailAddr: DUMMY_STORE_INFO.detailAddr,
    pno: DUMMY_STORE_INFO.pno,
    imgSrc: DUMMY_STORE_INFO.imgSrc,
  });

  const onChangeInfoHandler = (name, value) => {
    setStoreInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const editInfoHandler = (e) => {
    e.preventDefault();

    alert("스토어 정보가 수정되었습니다.");
    console.log(storeInfo);
    setIsEditting((prev) => !prev);
  };

  const cancelInfoEditHandler = () => {
    setStoreInfo((prev) => {
      return {
        storeId: DUMMY_STORE_INFO.storeId,
        storeName: DUMMY_STORE_INFO.storeName,
        desc: DUMMY_STORE_INFO.desc,
        pno: DUMMY_STORE_INFO.pno,
        streetAddr: DUMMY_STORE_INFO.streetAddr,
        zipcode: DUMMY_STORE_INFO.zipcode,
        detailAddr: DUMMY_STORE_INFO.detailAddr,
      };
    });

    setIsEditting((prev) => !prev);

    alert("수정이 취소되었습니다.");
  };

  const toggleIsEditting = (e) => {
    e.preventDefault();
    setIsEditting((prev) => !prev);
  };

  return (
    <div className={classes.mystore}>
      <MyStoreHeader
        info={storeInfo}
        isEditting={isEditting}
        onStoreInfoChange={onChangeInfoHandler}
      />
      <div className={classes.container}>
        <Outlet
          context={{
            storeInfo,
            isEditting,
            onChangeInfoHandler,
            editInfoHandler,
            cancelInfoEditHandler,
            toggleIsEditting,
          }}
        />
      </div>
    </div>
  );
};

export default MyStore;
