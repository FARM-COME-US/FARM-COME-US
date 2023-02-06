import React from "react";

import classes from "./style/AddLiveModal.module.scss";

import BottomUpModal from "../common/BottomUpModal";
import MyStoreProductInfoList from "./MyStoreProductInfoList";
import Button from "../common/Button";

const AddProductModal = (props) => {
  return (
    <BottomUpModal
      className={`${props.className} ${classes.modal}`}
      title={props.title}
      onToggleModal={props.onToggleModal}
    >
      <form className={classes.form}>
        <MyStoreProductInfoList className={classes.infoList} />
        <Button
          className={classes.btnRegist}
          onSubmit={props.onSubmit}
          onClick={props.onClick}
        >
          상품 등록
        </Button>
      </form>
    </BottomUpModal>
  );
};

export default AddProductModal;
