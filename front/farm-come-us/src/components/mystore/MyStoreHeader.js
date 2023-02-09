import React, { Fragment, useRef } from "react";

import classes from "./style/MyStoreHeader.module.scss";

import { MdAddCircle } from "react-icons/md";
import MyStoreHeaderInfo from "./MyStoreHeaderInfo";
import MyStoreMenu from "./MyStoreMenu";

const MyStoreHeader = (props) => {
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
    props.onStoreInfoChange("imgSrc", URL.createObjectURL(file));
  };

  return (
    <div className={classes.storeHeader}>
      <div className={classes.headerBg}>
        <div className={classes.backdrop}></div>
        {props.info.imgSrc ? (
          <div className={classes.bgBox}>
            <img ref={bgImgRef} src={props.info.imgSrc} alt="header-bg" />
            <span>스토어 미리보기</span>
          </div>
        ) : (
          <div className={classes.noImg}>
            <img
              className={classes.hiddenImg}
              ref={bgImgRef}
              src=""
              alt="header-bg"
            />
            <span>스토어 이미지를 추가해주세요</span>
          </div>
        )}
      </div>
      <form className={classes.header}>
        <label htmlFor="select-bg">
          <MdAddCircle className={classes.btnAddBg} />
        </label>
        <MyStoreHeaderInfo
          storeName={props.info.storeName}
          desc={props.info.desc}
        />
        {props.info.storeId ? <MyStoreMenu /> : null}
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
