import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StoreHeader from "../../components/store/StoreHeader";
import StoreTab from "../../components/store/StoreTab";
import { fetchStoreDetail } from "../../utils/api/store-http";

import Loading from "../../components/common/Loading";
import LiveList from "../../components/live/LiveList";

const Store = () => {
  const location = useLocation();
  const [storeDetail, setStoreDetail] = useState();

  useEffect(() => {
    async function getItemDetail() {
      try {
        const storeData = await fetchStoreDetail(location.state.storeId);
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
          <Outlet context={[location.state.storeId]} />
        </div>
      </div>
    );
  }
};

export default Store;
