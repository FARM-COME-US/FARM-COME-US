import React from "react";

import classes from "./style/MyStoreProductItem.module.scss";

const MyStoreProductItem = (props) => {
  const convertedPrice = props.item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const dateConversionHandler = () => {
    const regDt = props.item.regDate;
    const year = regDt.getFullYear();
    const month = regDt.getMonth() + 1;
    const date = regDt.getDate();
    let hour = regDt.getHours();
    hour = hour < 12 ? "0" + hour : hour;
    let minute = regDt.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;

    return `${year}.${month}.${date} ${hour}:${minute}`;
  };

  const convertedDate = dateConversionHandler();

  return (
    <div className={classes.productItem}>
      <div className={classes.productThumbnail}>
        <img src={props.item.imgSrc} alt="live_img" />
      </div>
      <div className={classes.infoBox}>
        <div className={classes.productInfo}>
          <span className={classes.productName}>{props.item.productName}</span>
          <span
            className={classes.stock}
          >{`남은 수량: ${props.item.stock}${props.item.unit}`}</span>
        </div>
        <div
          className={classes.unitPrice}
        >{`${convertedPrice} / ${props.item.count}${props.item.unit}`}</div>
        <div className={classes.date}>{`등록일 : ${convertedDate}`}</div>
      </div>
    </div>
  );
};

export default MyStoreProductItem;
