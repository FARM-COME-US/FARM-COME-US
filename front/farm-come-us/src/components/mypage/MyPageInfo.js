import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

import classes from "./style/MyStoreInfo.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreInfoList from "../../components/mystore/MyStoreInfoList";
import Button from "../../components/common/Button";

const MyStoreInfo = () => {
  const { info } = useOutletContext();
  const [storeInfo, setStoreInfo] = useState({
    storeId: info.storeId,
    storeName: info.storeName,
    desc: info.desc,
    addr: info.addr,
    pno: info.pno,
  });
  const [isEditting, setIsEditting] = useState(false);

  const onChangeInfoHandler = (e) => {
    const name = e.target.name;
    setStoreInfo((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  const editInfoHandler = (e) => {
    e.preventDefault();

    alert("스토어 정보가 수정되었습니다.");
    setIsEditting((prev) => !prev);
  };

  const cancelInfoEditHandler = () => {
    setStoreInfo((prev) => {
      return {
        storeId: info.storeId,
        storeName: info.storeName,
        desc: info.desc,
        addr: info.addr,
        pno: info.pno,
      };
    });

    setIsEditting((prev) => !prev);

    alert("수정이 취소되었습니다.");
  };

  const toggleIsEditting = (e) => {
    e.preventDefault();
    setIsEditting((prev) => !prev);
  };

  return (
    <div className={classes.storeInfo}>
      <MyStoreContentTitle text="스토어 정보" />
      <form>
        <MyStoreInfoList
          className={classes.infoList}
          info={storeInfo}
          isEditting={isEditting}
          onChange={onChangeInfoHandler}
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
