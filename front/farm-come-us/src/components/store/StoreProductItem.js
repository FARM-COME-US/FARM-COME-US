import React from "react";
import { Link } from "react-router-dom";
import classes from "./style/StoreProductItem.module.scss";

const StoreProductItem = (props) => {
  const convertedPrice = props.product.itemPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Link to={`/product-detail`} state={{ item_id: props.product.itemId }}>
      <div className={classes.container}>
        <div className={classes.imagespace}>
          <img src="https://via.placeholder.com/300" alt="공백"></img>
        </div>
        <div className={classes.scriptspace}>
          <div className={classes.firstline}>
            <div className={classes.productname}>{props.product.itemName}</div>
            <div className={classes.productamount}>
              {props.product.itemStock}kg
            </div>
          </div>
          <div className={classes.thirdline}>{props.product.productScript}</div>
          <div className={classes.secondline}>5kg / {convertedPrice}원</div>
        </div>
      </div>
    </Link>
  );
};

export default StoreProductItem;
