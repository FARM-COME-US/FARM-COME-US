import React from "react";
import { Outlet } from "react-router-dom";

import classes from "./style/MyStore.module.scss";

import MyStoreHeader from "../../components/mystore/MyStoreHeader";

const MyStore = () => {
  return (
    <div className={classes.mystore}>
      <MyStoreHeader />
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default MyStore;
