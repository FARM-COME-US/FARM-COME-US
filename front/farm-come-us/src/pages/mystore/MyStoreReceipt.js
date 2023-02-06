import React from "react";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreReceiptList from "../../components/mystore/MyStoreReceiptList";

const DUMMY_RECEIPT = [
  {
    receiptId: 1,
    date: new Date("2023", "0", "30", "01", "23", "23"),
    productId: 1,
    productName: "강원도 고랭지 배추",
    orderId: 101561056,
    totalPrice: 234000,
  },
  {
    receiptId: 2,
    date: new Date("2023", "0", "30", "02", "42", "24"),
    productId: 2,
    productName: "제주 스윗 당근",
    orderId: 105616421,
    totalPrice: 121000,
  },
  {
    receiptId: 3,
    date: new Date(),
    productId: 3,
    productName: "보성 녹차 건조 차잎",
    orderId: 105641232,
    totalPrice: 126000,
  },
];

const MyStoreReceipt = () => {
  return (
    <div>
      <MyStoreContentTitle text="판매내역" />
      <MyStoreReceiptList list={DUMMY_RECEIPT} />
    </div>
  );
};

export default MyStoreReceipt;
