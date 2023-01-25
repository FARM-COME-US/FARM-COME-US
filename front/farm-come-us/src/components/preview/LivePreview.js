import React from "react";

import classes from "./style/LivePreview.module.scss";

import PreviewHeader from "./PreviewHeader";
import LivePreviewList from "./LivePreviewList";
import { MdOutlineLiveTv } from "react-icons/md";

const LivePreview = () => {
  return (
    <div id="live-preview-container">
      <PreviewHeader
        className={`${classes.header} title`}
        text="진행 중인 라이브"
        logo={<MdOutlineLiveTv className={classes.logo} />}
      />
      <LivePreviewList />
    </div>
  );
};

export default LivePreview;
