import React from "react";

import classes from "./style/Header.module.scss";

const Header = (props) => {
  return (
    <div className={`${classes.header} ${props.className}`}>
      <div className={`${classes.logo}`}></div>
      <div className={`${classes.menuBtn}`}>
        <img srt="img/menubutton.png" alt="메뉴버튼"></img>
      </div>
    </div>
  );
};

export default Header;
