import React from "react";

import classes from "./style/LiveFooter.module.scss";

import LeaveButton from "./LeaveButton";

const LiveFooter = (props) => {
  return <div className={classes.footerContainer}>{props.children}</div>;
};

export default LiveFooter;
