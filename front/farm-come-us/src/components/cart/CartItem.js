import React from "react";
import classes from "./style/CartItem.module.scss";
import Card from "../common/Card";

const CartItem = (props) => {
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.cardHeader}></div>
        <div className={classes.cardBody}></div>
        <div className={classes.cardFooter}></div>
      </Card>
    </div>
  );
};

export default CartItem;
