import React from "react";

import classes from "./style/MyStoreLiveItem.module.scss";

const MyStoreLiveItem = (props) => {
  const today = new Date();
  const endDate = new Date(props.item.startDate.getTime() + 1 * 60 * 60 * 1000);
  const isLiveEnded = today.getTime() >= endDate.getTime() ? true : false;

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
      <div className={classes.liveThumbnail}>
        {isLiveEnded ? (
          <div className={classes.backdrop}>
            <span>종료된 라이브</span>
          </div>
        ) : null}
        <img src={props.item.imgSrc} alt="live_img" />
      </div>
      <div className={classes.liveInfo}>
        <div className={classes.productInfo}>
          <span className={classes.title}>{props.item.title}</span>
          <span
            className={classes.stock}
          >{`남은 수량: ${props.item.stock}${props.item.unit}`}</span>
        </div>
        <div
          className={classes.unitPrice}
        >{`${convertedPrice}/${props.item.count}${props.item.unit}`}</div>
        <div className={classes.date}>{`${reservedDate()}`}</div>
      </div>
    </div>
  );
};

export default MyStoreLiveItem;
