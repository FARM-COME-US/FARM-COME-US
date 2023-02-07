import React from "react";
import Card from "../common/Card";
import classes from "./style/CartCard.module.scss";

const CartCard = () => {
  return (
    <div className={classes.container}>
      <Card></Card>
    </div>
  );
};

export default CartCard;
