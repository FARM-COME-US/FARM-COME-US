import { Fragment, React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./style/BroadCast.module.scss";
import OvContainer from "../utils/OV/OvContainer";

const BroadCast = () => {
  const width = 1280;
  const height = 720;

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      alert("존재하지 않는 방송입니다.");
      navigate(-1);
    }
  }, []);

  return (
    <Fragment>
      {state ? (
        <OvContainer
          width={width}
          height={height}
          sessionId={state.id}
          username={state.username}
          liveInfo={state.liveInfo}
          isPublisher={state.isPublisher}
          className={classes.ovContainer}
        />
      ) : null}
    </Fragment>
  );
};

export default BroadCast;
