import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StoreHeader from "../../components/store/StoreHeader";
import StoreTab from "../../components/store/StoreTab";
import { fetchStoreDetail } from "../../utils/api/store-http";

const Store = () => {
  const location = useLocation();
  const [storeDetail, setStoreDetail] = useState();

  useEffect(() => {
    async function getItemDetail() {
      try {
        const storeData = await fetchStoreDetail(location.state.storeId);
        console.log(storeData.data);
        setStoreDetail(storeData.data);
      } catch (err) {
        console.log(err);
      }
    }

    getItemDetail();
  }, [location.state.storeId]);

  if (storeDetail) {
    return (
      <div>
        <StoreHeader storeInfo={storeDetail}></StoreHeader>
        <StoreTab storeId={location.state.storeId}></StoreTab>
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
};

export default Store;
