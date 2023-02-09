import React from "react";
import { useOutletContext } from "react-router-dom";

import classes from "./style/MyStoreInfo.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreInfoList from "../../components/mystore/MyStoreInfoList";
import Button from "../../components/common/Button";

const MyStoreInfo = () => {
  const {
    storeInfo,
    isEditting,
    onChangeInfoHandler,
    editInfoHandler,
    cancelInfoEditHandler,
    toggleIsEditting,
  } = useOutletContext();

  const inputChangeHandler = (e) => {
    onChangeInfoHandler(e.target.name, e.target.value);
  };

  return (
    <div className={classes.storeInfo}>
      <MyStoreContentTitle text="스토어 정보" />
      <form>
        <MyStoreInfoList
          className={classes.infoList}
          info={storeInfo}
          isEditting={isEditting}
          onChange={inputChangeHandler}
        />
        {isEditting ? (
          <div className={classes.btnBox}>
            <Button className={classes.btnSubmit} onClick={editInfoHandler}>
              수정
            </Button>
            <Button
              className={classes.btnCancel}
              onClick={cancelInfoEditHandler}
            >
              취소
            </Button>
          </div>
        ) : (
          <Button className={classes.btnEditInfo} onClick={toggleIsEditting}>
            스토어 정보 수정
          </Button>
        )}
      </form>
    </div>
  );
};

export default MyStoreInfo;
