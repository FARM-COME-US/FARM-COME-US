import React, { useRef } from "react";

import classes from "./style/MyStoreProductInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const DUMMY_CATEGORY = [
  { id: 1, name: "뿌리채소" },
  { id: 2, name: "쌈채소" },
  { id: 3, name: "고구마/감자" },
  { id: 4, name: "줄기채소" },
];

const MyStoreProductInfoList = (props) => {
  const imgRef = useRef();

  const onInfoChangeHandler = (e) => {
    props.onChange(e.target.name, e.target.value);
  };

  const onImgChangeHandler = (e) => {
    onInfoChangeHandler(e);
    loadImgFile(e);
  };

  const loadImgFile = (e) => {
    const file = e.target.files[0]; //선택된 파일 가져오기
    props.onChange("file", file);
  };

  return (
    <ul className={`${classes.productInfoList} ${props.className}`}>
      <li className={classes.infoItem}>
        <select
          name="category"
          value={props.productInfo.itemCreatedAt.categoryName}
        >
          <option value="">카테고리 선택</option>
          {DUMMY_CATEGORY.map((category, idx) => (
            <option key={idx} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="상품명"
          type="text"
          name="itemName"
          value={props.productInfo.itemName}
          onChange={onInfoChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="가격"
          type="number"
          value={props.productInfo.itemPrice}
          name="itemPrice"
          onChange={onInfoChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="수량"
          type="number"
          value={props.productInfo.itemStock}
          name="itemStock"
          onChange={onInfoChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="상품 상세정보"
          type="text"
          value={props.productInfo.itemDescription}
          name="itemDescription"
          onChange={onInfoChangeHandler}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="상품 이미지"
          type="file"
          value={props.productInfo.imgSrc}
          name="imgSrc"
          onChange={onImgChangeHandler}
        />
        <img
          className={classes.file}
          src={props.productInfo.file}
          alt="상품 이미지"
        />
      </li>
    </ul>
  );
};

export default MyStoreProductInfoList;
