import React from "react";
import classes from "./style/SideMenuItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import menuSlice from "../../reduxStore/menuSlice";

const SideMenuItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={classes.SideMenuItem}
      onClick={() => {
        dispatch(menuSlice.actions.toggle());
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

//
export default SideMenuItem;
