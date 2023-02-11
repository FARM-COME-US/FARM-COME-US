import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";

import classes from "./style/BroadCast.module.scss";
import OvContainer from "../utils/OV/OvContainer";

const BroadCast = () => {
  const width = 1280;
  const height = 720;

  const { state } = useLocation();

  return (
    <OvContainer
      width={width}
      height={height}
      sessionId={state.id}
      username={state.username}
      liveInfo={state.liveInfo}
      isPublisher={state.isPublisher}
      className={classes.ovContainer}
    />
  );
};

export default BroadCast;
