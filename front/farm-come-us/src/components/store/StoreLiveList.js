import React from "react";
import classes from "./style/StoreLiveList.module.scss";
import StoreLiveItem from "./StoreLiveItem";

const StoreLiveList = (props) => {
  let list = <span>등록된 라이브가 없습니다.</span>;

  if (props.liveList && props.liveList.length > 0) {
    list = props.liveList.map((item) => (
      <StoreLiveItem key={item.liveId} live={item} />
    ));
  }

  return <ul className={classes.livelist}>{list}</ul>;
};

export default StoreLiveList;
