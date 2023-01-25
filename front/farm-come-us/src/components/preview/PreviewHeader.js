import React from "react";
import classes from "./style/PreviewHeader.module.scss";

const PreviewHeader = (props) => {
  return (
    <div className={`${props.className} ${classes.header}`}>
      {props.logo}
      <span className={`${classes.title}`}>{props.text}</span>
    </div>
  );
};

export default PreviewHeader;
