import React from "react";

import classes from "./style/Header.module.scss";

const Header = () => {
  return (
    <div className={`${classes.header} ${props.className}`}>
      <div className={`${classes.logo}`}></div>
      <div className={`${classes.menuBtn}`}></div>
    </div>
  );
};

export default Header;
