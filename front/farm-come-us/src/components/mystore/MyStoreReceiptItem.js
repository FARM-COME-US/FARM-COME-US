import React from "react";

const MyStoreReceiptItem = (props) => {
  return (
    <div>
      <div></div>
      <div>
        <p>{props.itemInfo.productName}</p>
        <p>{props.itemInfo.selId}</p>
        <p>{props.itemInfo.totalPrice}</p>
      </div>
    </div>
  );
};

export default MyStoreReceiptItem;
