import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import StoreHeader from "../../components/store/StoreHeader";
import StoreTab from "../../components/store/StoreTab";

const DUMMY_STORE = [
  {
    storeId: 1,
    storeName: "애플 인 더 청송",
    storeDes:
      "저희 농장은 강원도 고산 지대에서 재배한 신선한 작물들을 제공합니다.",
    storeAddress: "강원도 평창군 봉편면 무이리 23-12",
    phoneNumber: "010-1234-1234",
  },
  {
    storeId: 2,
    storeName: "페어 인 더 청송",
    storeDes:
      "저희 농장은 강원도 고산 지대에서 재배한 신선한 작물들을 제공합니다.",
    storeAddress: "강원도 평창군 봉편면 무이리 23-12",
    phoneNumber: "010-1234-1234",
  },
  {
    storeId: 3,
    storeName: "퍼시먼 인 더 청송",
    storeDes:
      "저희 농장은 강원도 고산 지대에서 재배한 신선한 작물들을 제공합니다.",
    storeAddress: "강원도 평창군 봉편면 무이리 23-12",
    phoneNumber: "010-1234-1234",
  },
];

const Store = () => {
  const location = useLocation();

  const storeInfo = DUMMY_STORE.filter(
    (item) => item.storeId === location.state.storeId
  );

  return (
    <div>
      <StoreHeader storeInfo={storeInfo[0]}></StoreHeader>
      <StoreTab storeId={location.state.storeId}></StoreTab>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Store;
