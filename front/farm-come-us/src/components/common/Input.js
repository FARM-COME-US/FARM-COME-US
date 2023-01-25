import React from "react";

import classes from "./style/Input.module.scss";

const Input = (props) => {
  return (
    <input
      className={`${classes.input} ${props.className}`}
      type={props.type}
      value={props.value}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
};

export default Input;
