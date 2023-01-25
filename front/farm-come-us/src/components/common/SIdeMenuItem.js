import React from "react";
import classes from "./style/SideMenuItem.module.scss";

const SideMenuItem = (props) => {
  const isLogin = ""; // 유저정보 구독해야함
  return (
    <div className={classes.SideMenuItem}>
      <div>
        <image src={`./baseURLforimage/${props.imageName}`} alt="" />
        <div>{props.itemName}</div>
      </div>

      {isLogin ? <div className={classes.SideMenuItem}></div> : ""}
      {/* 로그아웃버튼 -> 로그인시 렌더링, 아니면 안함. */}
    </div>
  );
};

export default SideMenuItem;
