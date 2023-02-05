import React, { useState } from "react";
import classes from "./style/StoreHeader.module.scss";
import { AiFillHeart } from "react-icons/ai";

const dummyStoreData = {
  storeName: "고랭강원농장",
  storePR:
    "저희 농장은 강원도 고산 지대에서 재배한 신선한 작물들을 제공합니다.",
  storeAddress: "강원도 평창군 봉평면 무이리 23-12",
  phoneNumber: "010-1234-1234",
};

const StoreHeader = () => {
  const [pickStore, setPick] = useState(false);
  const dealSetPick = () => {
    setPick(!pickStore);
  };

  return (
    <div className={classes.container}>
      <div className={classes.storename}>{dummyStoreData.storeName}</div>
      <div className={classes.prtext}>{dummyStoreData.storePR}</div>
      <div className={classes.headerbottom}>
        <div onClick={dealSetPick}>
          <div
            className={`${classes.pickbutton} ${
              pickStore ? classes.active : null
            }`}
          >
            <AiFillHeart
              className={`${classes.heart} ${
                pickStore ? classes.active : null
              }`}
            ></AiFillHeart>
          </div>
        </div>
        <div className={classes.bottomtext}>
          <div className={classes.address}>{dummyStoreData.storeAddress}</div>
          <div className={classes.phonenumber}>
            {dummyStoreData.phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
