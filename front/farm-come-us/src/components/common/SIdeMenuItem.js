import React from "react";
import classes from "./style/SideMenuItem.module.scss";
import { useNavigate } from "react-router-dom";

const SideMenuItem = (props) => {
  const isLogin = ""; // 유저정보 구독해야함
  navigate = useNavigate();

  return (
    <div className={classes.SideMenuItem} onClick={navigate(props.linkTo)}>
      {/* 상위 컴포넌트에서 prop으로 주는 주소로 들어가게 했음. */}
      <div>
        <image src={`./baseURLforimage/${props.imageName}`} alt="" />
        <div>{props.itemName}</div>
      </div>
    </div>
  );
};

export default SideMenuItem;
