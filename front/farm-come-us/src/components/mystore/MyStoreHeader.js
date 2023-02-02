import React, { useRef } from "react";

import classes from "./style/MyStoreHeader.module.scss";

import { MdAddCircle } from "react-icons/md";
import MyStoreHeaderInfo from "./MyStoreHeaderInfo";
import MyStoreMenu from "./MyStoreMenu";

const DUMMY_STORE_INFO = {
  storeName: "고랭강원농장",
  desc: "저희 농장은 강원도 고산 지대에서 재배한 신선한 작물들을 제공합니다",
};

const MyStoreHeader = () => {
  const inputBgRef = useRef();
  const bgImgRef = useRef();

  const addBgImageHandler = () => {
    alert("이미지 추가 이벤트");
    return;
  };

  const loadBgFile = () => {
    const file = inputBgRef.current.files[0]; //선택된 파일 가져오기
    //이미지 source 가져오기
    bgImgRef.current.src = URL.createObjectURL(file);
  };

  return (
    <div className={classes.storeHeader}>
      <div className={classes.headerBg}>
        <div className={classes.backdrop}></div>
        <img
          ref={bgImgRef}
          src="https://via.placeholder.com/300"
          alt="header-bg"
        />
      </div>
      <form className={classes.header}>
        <label htmlFor="select-bg">
          <MdAddCircle className={classes.btnAddBg} />
        </label>
        <MyStoreHeaderInfo
          storeName={DUMMY_STORE_INFO.storeName}
          desc={DUMMY_STORE_INFO.desc}
        />
        <MyStoreMenu />
        <input
          ref={inputBgRef}
          id="select-bg"
          className={classes.imgInput}
          type="file"
          accept=".gif, .jpg, .png"
          onChange={loadBgFile}
        />
      </form>
    </div>
  );
};

export default MyStoreHeader;
