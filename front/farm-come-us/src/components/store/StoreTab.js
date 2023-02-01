import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./style/StoreTab.module.scss";

const StoreTab = () => {
  return (
    <div className={classes.LiveTab}>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : null)}
        to="live"
      >
        <span className={classes.highlight}>Store</span>
        <span>live</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : null)}
        to="products"
      >
        <span className={classes.highlight}>판매</span>
        <span>상품</span>
      </NavLink>
    </div>
  );
};

export default StoreTab;
