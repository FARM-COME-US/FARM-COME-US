import React, { useRef } from "react";
import classes from "./style/MyPageHeader.module.scss";
import { MdAddCircle } from "react-icons/md";
import MyPageMenu from "../../pages/mypage/MyPageMenu";

const MyPageHeader = (props) => {
  const inputProfileRef = useRef();
  const profileImgRef = useRef();
  // const nickname = props.nickname;

  const loadProfileFile = () => {
    const file = inputProfileRef.current.files[0]; //선택된 파일 가져오기
    //이미지 source 가져오기
    profileImgRef.current.src = URL.createObjectURL(file);
    props.userInfoChangeHandler("imgSrc", profileImgRef.current.src);
    props.userInfoChangeHandler("file", file);
  };

  return (
    <div className={classes.myPageHeader}>
      <div className={classes.flexbox}>
        <div className={classes.innerflexbox}>
          <div className={classes.nicknameTxt}>{props.userInfo.nickname}</div>
          {!props.isEditting ? (
            <div className={classes.normalTxt}>{"님 안녕하세요."}</div>
          ) : null}
        </div>
        <div className={classes.imgWrapper}>
          <img
            className={classes.profileImg}
            src={props.userInfo.imgSrc}
            alt="이미지"
            ref={profileImgRef}
          />
          <input
            ref={inputProfileRef}
            id="select-profile"
            className={classes.imgInput}
            type="file"
            accept=".gif, .jpg, .png"
            onChange={loadProfileFile}
          ></input>

          {/* props로 경로 받아오거나, 이미지 던짐. */}
        </div>
        {props.isEditting ? (
          <label htmlFor="select-profile">
            <MdAddCircle className={classes.btnAddBg} />
          </label>
        ) : null}
      </div>

      <MyPageMenu userInfo={props.userInfo} />
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
