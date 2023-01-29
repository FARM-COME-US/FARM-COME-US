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
      id={props.id} // 추가했습니다.
      readOnly={props.readOnly}
    />
  );
};

export default Input;
