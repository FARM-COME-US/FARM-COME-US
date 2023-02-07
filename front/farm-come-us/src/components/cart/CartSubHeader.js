import React from "react";
import classes from "./style/CartSubHeader.module.scss";

const CartSubHeader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.select}>
        <div className={classes.button}></div>
      </div>
      <div className={classes.text}>
        <div>전체선택</div>
        <div>선택삭제</div>
      </div>
    </div>
  );
};

export default CartSubHeader;
