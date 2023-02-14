import React, { useState, useEffect } from "react";
import { fetchStoreProducts } from "../../utils/api/product-http";
import { fetchAddLive } from "../../utils/api/live-http";

import classes from "./style/AddLiveModal.module.scss";

import BottomUpModal from "../common/BottomUpModal";
import MyStoreLiveInfoList from "./MyStoreLiveInfoList";
import Button from "../common/Button";

const AddLiveModal = (props) => {
  const initNewLiveInfo = {
    storeId: props.storeInfo.storeId,
    itemId: "",
    itemName: "",
    itemPrice: "",
    itemStock: 0,
    itemDescription: "",
    liveTitle: "",
    liveStart: "",
    liveDiscount: 0,
    livePrice: "",
    liveStartDate: "",
    liveStartTime: "",
  };

  const [selectedItem, setSelecteItem] = useState("");
  const [productList, setProductList] = useState([]);
  const [newLiveInfo, setNewLiveInfo] = useState({ ...initNewLiveInfo });

  useEffect(() => {
    if (props.storeInfo.storeId) {
      fetchStoreProducts(props.storeInfo.storeId, 0, 8).then((res) => {
        const data = res.data;
        console.log(data.itemImage);
        console.log(data.itemList);
        setProductList([...data.itemList]);
      });
    }
  }, []);

  const onOptionChangeHandler = (e) => {
    const itemInfo = productList.filter(
      (item) => item.itemId === e.target.value * 1
    );

    if (itemInfo[0]) {
      setNewLiveInfo((prev) => {
        return {
          ...prev,
          ...itemInfo[0],
        };
      });
    } else {
      setNewLiveInfo((prev) => {
        return {
          ...initNewLiveInfo,
        };
      });
    }
    setSelecteItem(e.target.value);
  };

  const newLiveInputChangeHandler = (name, value) => {
    setNewLiveInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addLiveHandler = (e) => {
    e.preventDefault();
    fetchAddLive(newLiveInfo);
    // props.onToggleModal();
  };

  let options = null;
  if (productList && productList.length > 0) {
    options = productList.map((item, idx) => (
      <option key={idx} value={item.itemId}>
        {item.itemName}
      </option>
    ));
  }

  return (
    <BottomUpModal
      className={`${props.className} ${classes.modal}`}
      title={props.title}
      onToggleModal={props.onToggleModal}
    >
      <div className={classes.myProducts}>
        <select
          className={classes.productList}
          value={selectedItem}
          onChange={onOptionChangeHandler}
        >
          <option value="">상품을 선택해주세요.</option>
          {options}
        </select>
      </div>
      <form className={classes.form} onSubmit={addLiveHandler}>
        <MyStoreLiveInfoList
          className={classes.infoList}
          newLiveInfo={newLiveInfo}
          onChange={newLiveInputChangeHandler}
        />
        <Button className={classes.btnRegist}>Live 예약등록</Button>
      </form>
    </BottomUpModal>
  );
};

export default AddLiveModal;
