import React from "react";
import { Outlet } from "react-router-dom";
import StoreHeader from "../../components/store/StoreHeader";
import StoreLiveList from "../../components/store/StoreLiveList";
import StoreProductList from "../../components/store/StoreProductList";
import StoreNoData from "../../components/store/StoreNoData";
import StoreTab from "../../components/store/StoreTab";

const Store = () => {
  return (
    <div>
      <StoreHeader></StoreHeader>
      <StoreTab></StoreTab>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Store;
