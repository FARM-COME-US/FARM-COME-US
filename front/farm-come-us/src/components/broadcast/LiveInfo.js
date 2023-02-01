import React from "react";

import classes from "./style/LiveInfo.module.scss";

import LiveInfoBadge from "./LiveInfoBadge";
import { ImUsers } from "react-icons/im";
import { AiFillGift } from "react-icons/ai";

const LiveInfo = (props) => {
  return (
    <div className={classes.infoBox}>
      <LiveInfoBadge icon={<ImUsers />} value={`${props.subCnt}명`} />
      <LiveInfoBadge
        icon={<AiFillGift />}
        value={`${props.stock}${props.unit}`}
      />
    </div>
  );
};

export default LiveInfo;
