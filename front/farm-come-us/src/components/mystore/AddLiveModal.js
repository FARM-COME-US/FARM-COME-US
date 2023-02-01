import React from "react";

import classes from "./style/AddLiveModal.module.scss";

import BottomUpModal from "../common/BottomUpModal";
import MyStoreLiveInfoList from "./MyStoreLiveInfoList";
import Button from "../common/Button";

const AddLiveModal = (props) => {
  return (
    <BottomUpModal
      className={`${props.className} ${classes.modal}`}
      title={props.title}
      onToggleModal={props.onToggleModal}
    >
      <form className={classes.form}>
        <MyStoreLiveInfoList className={classes.infoList} />
        <Button
          className={classes.btnRegist}
          onSubmit={props.onSubmit}
          onClick={props.onClick}
        >
          Live 예약등록
        </Button>
      </form>
    </BottomUpModal>
  );
};

export default AddLiveModal;
