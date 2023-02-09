import React from "react";
import classes from "./style/Cart.module.scss";
import CartHeader from "../components/cart/CartHeader";
import CartList from "../components/cart/CartList";
import CartFooter from "../components/cart/CartFooter";
import CartSubHeader from "../components/cart/CartSubHeader";

const Cart = () => {
  return (
    <div className={classes.container}>
      <CartHeader></CartHeader>
      <CartSubHeader></CartSubHeader>
      <CartList></CartList>
      <CartFooter></CartFooter>
    </div>
  );
};

export default Cart;
