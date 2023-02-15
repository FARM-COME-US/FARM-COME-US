import React, { useState } from "react";
import classes from "./style/StoreHeader.module.scss";
import { AiFillHeart } from "react-icons/ai";

const StoreHeader = (props) => {
  const [pickStore, setPick] = useState(false);
  const dealSetPick = () => {
    setPick(!pickStore);
  };

  return (
    <div className={classes.container}>
      <img src={props.storeInfo.storeImage.savedPath} alt="공백"></img>
      <div className={classes.imgfilter}></div>
      <div className={classes.headerdes}>
        <div className={classes.storename}>
          {props.storeInfo.store.storeName}
        </div>
        <div className={classes.prtext}>
          {props.storeInfo.store.storeDescription}
        </div>
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
            <div className={classes.address}>
              {props.storeInfo.store.storeStreetAddr}
            </div>
            <div className={classes.phonenumber}>
              {props.storeInfo.store.storePhoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
