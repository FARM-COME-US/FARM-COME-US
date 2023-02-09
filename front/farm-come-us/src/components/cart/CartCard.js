import React from "react";
import classes from "./style/CartCard.module.scss";
import Card from "../common/Card";
import CartItem from "./CartItem";

const CartCard = (props) => {
  let item = props.itemList.map((item) => (
    <CartItem key={item.productId} item={item}></CartItem>
  ));

  const shippingFee = 2500;

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <div className={classes.buttonSpace}>
            <div className={classes.button}></div>
          </div>
          <div className={classes.textArea}>
            <div className={classes.storeName}>
              {props.itemList[0].storeName}
            </div>
            <div className={classes.productAmount}>상품 n개</div>
          </div>
        </div>
        <div className={classes.cardBody}>{item}</div>
        <div className={classes.cardFooter}>
          <div className={classes.shippingFee}>배송비 {shippingFee}원</div>
          <div className={classes.resultPrice}>
            <div className={classes.text}>총 금액</div>
            <div className={classes.price}>원</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartCard;
