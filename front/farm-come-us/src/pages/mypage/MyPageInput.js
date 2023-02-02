import React from "react";
import classes from "./style/MyPageInput.module.scss";

const MyPageInput = (props) => {
  return (
    <input
      className={`${classes.input} ${props.className}`}
      type={props.type}
      name={props.name}
      value={props.value}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      id={props.id} // 추가했습니다.
      placeholder={props.placeholder} // 추가
      readOnly={props.readOnly}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={props.onChange}
      disabled={props.disabled ? true : false}
    >
      {props.innerText}
    </input>
  );
};

export default MyPageInput;
