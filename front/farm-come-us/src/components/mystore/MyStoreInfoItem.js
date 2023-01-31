import React from "react";

import classes from "./style/MyStoreInfoItem.module.scss";

import Input from "../common/Input";

const MyStoreInfoItem = (props) => {
  return (
    <div className={classes.itemContainer}>
      <span className={`${classes.label} title`}>{props.label}</span>
      <Input
        className={classes.itemInput}
        value={props.value}
        readOnly={true}
      />
    </div>
  );
};

export default MyStoreInfoItem;
