import React from "react";
import MyStoreReceiptItem from "./MyStoreReceiptItem";

import classes from "./style/MyStoreReceiptList.module.scss";

const MyStoreReceiptList = (props) => {
  const diassembledReceiptHandler = () => {
    const set = new Set();
    const sortedReceipt = props.list.sort((a, b) => b.date - a.date);

    const arr = [];
    let pointer = -1;
    for (let receipt of sortedReceipt) {
      const date = receipt.date;
      const selDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (set.has(selDate)) {
        arr[pointer].push(receipt);
      } else {
        set.add(selDate);
        arr[++pointer] = [receipt];
      }
    }
    return arr;
  };

  const diassembledReceipt = diassembledReceiptHandler();

  return (
    <div className={classes.listContainer}>
      {diassembledReceipt.length === 0 ? (
        <div>조회된 판매내역이 없습니다.</div>
      ) : (
        <div>
          {diassembledReceipt.map((dateItem, idx) => (
            <div key={idx} className={classes.listContainer}>
              <div
                className={classes.date}
              >{`${dateItem[0].date.getFullYear()}.${
                dateItem[0].date.getMonth() + 1
              }.${dateItem[0].date.getDate()}`}</div>
              {dateItem.map((item, iIdx) => (
                <MyStoreReceiptItem key={iIdx} itemInfo={item} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStoreReceiptList;
