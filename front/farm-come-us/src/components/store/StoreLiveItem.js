import React from "react";
import classes from "./style/StoreLiveItem.module.scss";

const StoreLiveItem = (props) => {
  return (
    <ul>
      <div>{props.live.productName}</div>
    </ul>
  );
};

export default StoreLiveItem;
