import React from "react";
import classes from "./style/CartCard.module.scss";
import Card from "../common/Card";
import CartItem from "./CartItem";

const CartCard = (props) => {
  let item = props.itemList.map((item) => (
    <CartItem key={item.productId} item={item}></CartItem>
  ));

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <div className={classes.storeName}>{props.itemList[0].storeName}</div>
          <div>상품 n개</div>
        </div>
        <div className={classes.cardBody}>{item}</div>
        <div className={classes.cardFooter}></div>
      </Card>
    </div>
  );
};

export default CartCard;
