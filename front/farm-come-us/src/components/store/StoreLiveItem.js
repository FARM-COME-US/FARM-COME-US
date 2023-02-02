import React from "react";
import classes from "./style/StoreLiveItem.module.scss";

const StoreLiveItem = (props) => {
  const convertedPrice = props.live.productPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className={classes.container}>
      <div className={classes.imagespace}></div>
      <div className={classes.scriptspace}>
        <div className={classes.firstline}>
          <div className={classes.productname}>{props.live.productName}</div>
          <div className={classes.productamount}>
            {props.live.productAmount}kg
          </div>
        </div>
        <div className={classes.secondline}>
          {props.live.productOption}kg / {convertedPrice}원
        </div>
        <div className={classes.thirdline}>{props.live.liveDate}</div>
      </div>
    </div>
  );
};

export default StoreLiveItem;
