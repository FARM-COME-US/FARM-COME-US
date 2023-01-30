import React from "react";

import classes from "./style/MyStoreLiveItem.module.scss";

const MyStoreLiveItem = (props) => {
  const convertedPrice = props.item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const reservedDate = () => {
    const date = props.item.startDate;
    const startTime = date.getTime();
    const endDate = new Date(startTime + 1 * 60 * 60 * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    let hour = date.getHours();
    hour = hour < 12 ? "0" + hour : hour;

    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDt = endDate.getDate();
    let endHour = endDate.getHours();
    endHour = endHour < 12 ? "0" + endHour : endHour;

    let endMinute = endDate.getMinutes();
    endMinute = endMinute < 10 ? "0" + endMinute : endMinute;

    return `${year}.${month}.${dt} ${hour}:${minute} ~ ${endYear}.${endMonth}.${endDt} ${endHour}:${endMinute}`;
  };

  return (
    <div className={classes.liveItem}>
      <img src={props.item.imgSrc} alt="live_img" />
      <div className={classes.liveInfo}>
        <div className={classes.productInfo}>
          <span>{props.item.liveTitle}</span>
          <span>{`${props.item.stock}상자`}</span>
        </div>
        <div>{`${convertedPrice}/${props.item.unit}상자`}</div>
        <div>{`${reservedDate()}`}</div>
      </div>
    </div>
  );
};

export default MyStoreLiveItem;
