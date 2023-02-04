import React, { useState } from "react";

import classes from "./style/MyStoreProducts.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreProductList from "../../components/mystore/MyStoreProductList";

import AddButton from "../../components/mystore/AddButton";
import AddProductModal from "../../components/mystore/AddProductModal";

const DUMMY_PRODUCT_LIST = [
  {
    productId: 1,
    productName: "강원도 고랭지 배추",
    stock: 140,
    discount: 14,
    price: 14000,
    count: 1,
    unit: "개",
    regDate: new Date(2023, 1, 10, 23, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
  {
    productId: 2,
    productName: "강원도 고랭지 배추",
    storeName: "강원고랭",
    stock: 140,
    discount: 14,
    price: 14000,
    count: 1,
    unit: "개",
    regDate: new Date(2023, 0, 30, 6, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
];

const MyStoreProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* 기타 메서드 */
  const modalToggleHandler = () => {
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    setIsModalOpen((prev) => !prev);
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    alert("상품 등록 이벤트 발생");

    modalToggleHandler();
    return;
  };

  const showProductDetailHandler = (product, event) => {
    console.log(product, event);
    alert("상품 디테일로 넘어가는 이벤트");
  };

  return (
    <div className={classes.pageContainer}>
      <MyStoreContentTitle text="판매상품" />
      <MyStoreProductList
        products={DUMMY_PRODUCT_LIST}
        onClick={showProductDetailHandler}
      />

      <div className={classes.btnBox}>
        <AddButton className={classes.btnAdd} onClick={modalToggleHandler} />
      </div>

      {isModalOpen ? (
        <AddProductModal
          title="Live 정보 입력"
          className={isModalOpen ? null : "close"}
          onToggleModal={modalToggleHandler}
          onSubmit={addProductHandler}
          onClick={addProductHandler}
        />
      ) : null}
    </div>
  );
};

export default MyStoreProduct;
