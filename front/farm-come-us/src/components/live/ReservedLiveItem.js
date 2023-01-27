import React from "react";

import classes from "./style/LiveItem.module.scss";

import Card from "../common/Card";
import CardCaption from "../common/CardCaption";

const dayText = ["일", "월", "화", "수", "목", "금", "토"];

const ReservedLiveItem = (props) => {
  const convertedPrice = props.live.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const reservedDate = () => {
    const date = props.live.time;
    const today = new Date();

    let hour = date.getHours();
    hour = hour < 12 ? "0" + hour : hour;

    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;

    let day = "오늘";
    let ampm = hour < 12 ? "AM" : "PM";

    if (date.getDay() !== today.getDay()) {
      day = `${dayText[date.getDay()]}요일`;
    }

    return `${day} ${ampm} ${hour}:${minute}`;
  };

  return (
    <li className={classes.liveItem}>
      <Card className={classes.liveCard}>
        <figure>
          <img src="https://via.placeholder.com/300" alt="livePreview" />
          <div className={classes.backCover}></div>

          <div className={classes.reservedCaption}>
            <span>{`${reservedDate()} 시작`}</span>
          </div>

          <CardCaption className={classes.liveCaption}>
            <div className={classes.storeInfo}>
              <p>
                {props.live.storeName}
                <span className={classes.subfix}> 스토어</span>
              </p>
            </div>
            <div className={classes.liveTitle}>
              <span className={classes.text}>{props.live.productName}</span>
            </div>
            <div className={classes.productInfo}>
              <span className={classes.discount}>{props.live.discount}%</span>
              <span>
                {convertedPrice} / {props.live.unit}상자
              </span>
            </div>
          </CardCaption>
        </figure>
      </Card>
    </li>
  );
};

export default ReservedLiveItem;
