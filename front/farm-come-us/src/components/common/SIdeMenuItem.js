import React from "react";
import classes from "./style/SideMenuItem.module.scss";
import { useNavigate } from "react-router-dom";

const SideMenuItem = (props) => {
  const isLogin = ""; // 유저정보 구독해야함
  const navigate = useNavigate();

  return (
    <div
      className={classes.SideMenuItem}
      onClick={() => {
        setTimeout(navigate(props.linkTo), 300);
      }}
    >
      {/* 상위 컴포넌트에서 prop으로 주는 주소로 들어가게 했음. */}
      <div>
        <img src={`./baseURLforimage/${props.imageName}`} alt="" />
        <div>{props.itemName}</div>
      </div>
    </div>
  );
};

export default SideMenuItem;
