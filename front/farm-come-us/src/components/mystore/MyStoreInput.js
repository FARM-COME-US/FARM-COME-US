import React from "react";

import classes from "./style/MyStoreInput.module.scss";

import Input from "../common/Input";

const MyStoreInput = (props) => {
  return (
    <div className={classes.itemContainer}>
      <span className={`${classes.label} title`}>{props.label}</span>
      <Input
        className={classes.itemInput}
        value={props.value}
        name={props.name}
        readOnly={props.readOnly}
        type={props.type}
        min={props.min}
        max={props.max}
        step={props.step}
      />
    </div>
  );
};

export default MyStoreInput;
