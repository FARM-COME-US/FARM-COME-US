import React from "react";

import classes from "./style/LiveList.module.scss";

import LiveItem from "./LiveItem";
import ReservedLiveItem from "./ReservedLiveItem";

const LivePreviewList = (props) => {
  let list = (
    <p className={classes.noData}>
      {props.isLive
        ? "진행 중인 라이브가 없습니다"
        : "등록된 라이브가 없습니다."}
    </p>
  );

  if (props.liveList && props.liveList.length > 0) {
    list = props.isLive
      ? props.liveList.map((item, idx) => (
          <LiveItem key={idx} live={item} onClick={props.onEnter} />
        ))
      : props.liveList.map((item, idx) => (
          <ReservedLiveItem key={idx} live={item} />
        ));
  }

  return (
    <ul
      className={`${classes.liveList} ${
        props.isPreview ? classes.preview : null
      }`}
    >
      {list}
    </ul>
  );
};

export default LivePreviewList;
