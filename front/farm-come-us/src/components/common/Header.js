import React from "react";
import { useDispatch, useSelector } from "react-redux";
import menuSlice from "../../reduxStore/menuSlice";
import classes from "./style/Header.module.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.isOpen);
  return (
    <div className={`${classes.header} ${props.className}`}>
      <div className={`${classes.logo}`}>로고</div>
      <div
        className={classes.menuBtnWrapper}
        onClick={() => {
          dispatch(menuSlice.actions.toggle());
        }}
      >
        <img
          className={classes.menuBtn}
          src="img/menubutton.png"
          alt="메뉴버튼"
        />
      </div>
    </div>
  );
};

export default Header;
