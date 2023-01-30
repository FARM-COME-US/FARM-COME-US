import React from "react";
import classes from "./style/Input.module.scss";

const Input = (props) => {
  return (
    <input
      className={`${classes.input} ${props.className}`}
      type={props.type}
      // value={props.value} // 이거 넣으니까 onChange넣으라고 강요함.
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      id={props.id} // 추가했습니다.
      placeholder={props.placeholder} // 추가
      readOnly={props.readOnly}
    />
  );
};

export default Input;
