import React from "react";

import classes from "./style/LiveItem.module.scss";

import Card from "../common/Card";
import Badge from "../common/Badge";
import CardCaption from "../common/CardCaption";

const LiveItem = (props) => {
  const convertedPrice = props.live.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <li className={classes.liveItem}>
      <Card className={classes.liveCard}>
        <figure>
          <img src="https://via.placeholder.com/260" alt="livePreview" />
          <figcaption className={classes.badge}>
            <Badge className={classes.liveBadge}>Live</Badge>
          </figcaption>
          <CardCaption className={classes.liveCaption}>
            {/* <div className={classes.storeInfo}>
              <span>{props.live.storeName}</span>
              <span className={classes.subfix}> 스토어</span>
            </div> */}
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

export default LiveItem;
