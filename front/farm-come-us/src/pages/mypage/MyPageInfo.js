import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

import classes from "./style/MyPageInfo.module.scss";

import MyPageContentTitle from "../../components/mypage/MyPageContentTItle";
import MyPageInfoList from "../../components/mypage/MyPageInfoList";
import Button from "../../components/common/Button";

const MyUserInfo = () => {
  const { info } = useOutletContext();
  const [userInfo, setUserInfo] = useState({
    id: info.id,
    nickname: info.nickname,
    name: info.name,
    email: info.email,
    pno: info.pno,
    streetAddr: info.streetAddr,
    detailAddr: info.detailAddr,
    zipcode: info.zipcode,
  });
  const [isEditting, setIsEditting] = useState(false);

  const onChangeInfoHandler = (name, value) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const editInfoHandler = (e) => {
    e.preventDefault();

    alert("사용자 정보가 수정되었습니다.");
    setIsEditting((prev) => !prev);
  };

  const cancelInfoEditHandler = () => {
    setUserInfo((prev) => {
      return {
        nickname: info.nickname,
        name: info.name,
        email: info.email,
        pno: info.pno,
        streetAddr: info.streetAddr,
        detailAddr: info.detailAddr,
        zipcode: info.zipcode,
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
    <div className={classes.userInfo}>
      <MyPageContentTitle text="가입 정보" />
      <form>
        <MyPageInfoList
          className={classes.infoList}
          info={userInfo}
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
            사용자 정보 수정
          </Button>
        )}
      </form>
    </div>
  );
};

export default MyUserInfo;
