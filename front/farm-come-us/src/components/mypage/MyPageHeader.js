import React, { useState, useEffect, useRef } from "react";
import classes from "./style/MyPageHeader.module.scss";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import MyPageMenu from "../../pages/mypage/MyPageMenu";
// import MyStoreHeaderInfo from "./MyStoreHeaderInfo";
// import MyStoreMenu from "./MyStoreMenu";

const DUMMY_STORE_INFO = {
  storeName: "고랭강원농장",
  desc: "저희 농장은 강원도 고산 지대에서 재배한 신선한 작물들을 제공합니다",
};

const MyPageHeader = (props) => {
  const inputProfileRef = useRef();
  const profileImgref = useRef();
  // const nickname = props.nickname;
  const nickname = "귀여운 양파";

  const loadProfileFile = () => {
    const file = inputProfileRef.current.files[0]; //선택된 파일 가져오기
    //이미지 source 가져오기
    profileImgref.current.src = URL.createObjectURL(file);
  };
  const addBgImageHandler = () => {
    alert("이미지 추가 이벤트");
    return;
  };

  return (
    <div className={classes.myPageHeader}>
      <div className={classes.flexbox}>
        <div className={classes.innerflexbox}>
          <div className={classes.nicknameTxt}>{props.nickname}</div>
          <div className={classes.normalTxt}>{"님 안녕하세요."}</div>
        </div>
        <div className={classes.imgWrapper}>
          <img
            className={classes.profileImg}
            src={process.env.PUBLIC_URL + "/img/defaultProfile.png"}
            alt="이미지"
          />
          <input
            ref={inputProfileRef}
            id="select-profile"
            className={classes.imgInput}
            type="file"
            accept=".gif, .jpg, .png"
            onChange={loadProfileFile}
          ></input>
          <MdAddCircle className={classes.btnAddBg} onClick={loadProfileFile} />

          {/* props로 경로 받아오거나, 이미지 던짐. */}
        </div>
      </div>

      <MyPageMenu />
    </div>

    // <div className={classes.storeHeader}>
    //   <div className={classes.headerBg}>
    //     <div className={classes.backdrop}></div>
    //     <img src="https://via.placeholder.com/300" alt="header-bg" />
    //   </div>
    //   <div className={classes.header}>
    //     <MdAddCircle className={classes.btnAddBg} onClick={addBgImageHandler} />
    //     <MyStoreHeaderInfo
    //       storeName={DUMMY_STORE_INFO.storeName}
    //       desc={DUMMY_STORE_INFO.desc}
    //     />
    //     <MyStoreMenu />
    //   </div>
    // </div>
  );
};

export default MyPageHeader;
