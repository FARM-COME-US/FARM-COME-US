import { React, useState } from "react";
import { useLocation } from "react-router-dom";

import classes from "./BroadCast.module.scss";
import OvContainer from "../utils/OvContainer";

const sessionId = "sessionA";
const username = "Participant" + Math.floor(Math.random() * 100);

const BroadCast = () => {
  // const width = window.innerWidth;
  // const height = (width * 9) / 16;
  // const height = window.innerHeight;
  const width = 1280;
  const height = 720;
  console.log(width, height);

  return (
    <OvContainer
      width={width}
      height={height}
      sessionId={sessionId}
      username={username}
      className={classes.ovContainer}
    />
  );
};

export default BroadCast;
