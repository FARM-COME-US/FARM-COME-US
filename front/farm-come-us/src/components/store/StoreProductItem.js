import React from "react";
import { Link } from "react-router-dom";
import classes from "./style/StoreProductItem.module.scss";

const StoreProductItem = (props) => {
  const convertedPrice = props.product.productPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const storeProfile = {
    storeName: "고랭 강원 농장",
  };

  return (
    <Link
      to={`/product-detail`}
      state={{ productInfo: props.product, storeInfo: storeProfile }}
    >
      <div className={classes.container}>
        <div className={classes.imagespace}></div>
        <div className={classes.scriptspace}>
          <div className={classes.firstline}>
            <div className={classes.productname}>
              {props.product.productName}
            </div>
            <div className={classes.productamount}>
              {props.product.productAmount}kg
            </div>
          </div>
          <div className={classes.thirdline}>{props.product.productScript}</div>
          <div className={classes.secondline}>
            {props.product.productOption}kg / {convertedPrice}원
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreProductItem;
