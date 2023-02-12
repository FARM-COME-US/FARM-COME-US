import React from "react";

import classes from "./style/MyStoreProductInfoList.module.scss";

import MyStoreInput from "./MyStoreInput";

const DUMMY_CATEGORY = [
  { id: 1, name: "뿌리채소" },
  { id: 2, name: "쌈채소" },
  { id: 3, name: "고구마/감자" },
  { id: 4, name: "줄기채소" },
];

const MyStoreProductInfoList = (props) => {
  return (
    <ul className={`${classes.productInfoList} ${props.className}`}>
      <li className={classes.infoItem}>
        <select
          name="categoryName"
          value={props.productInfo.itemCreatedAt.categoryName}
          onChange={props.onChange}
        >
          <option value="">카테고리 선택</option>
          {DUMMY_CATEGORY.map((category, idx) => (
            <option key={idx} value={category.name}>
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
          onChange={props.onChange}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="가격"
          type="number"
          value={props.productInfo.itemPrice}
          name="itemPrice"
          onChange={props.onChange}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="수량"
          type="number"
          value={props.productInfo.itemStock}
          name="itemStock"
          onChange={props.onChange}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="상품 상세정보"
          type="text"
          value={props.productInfo.itemDescription}
          name="itemDescription"
          onChange={props.onChange}
        />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput
          label="상품 이미지"
          type="file"
          value={props.productInfo.imgSrc}
          name="imgSrc"
          onChange={props.onChange}
        />
      </li>
    </ul>
  );
};

export default MyStoreProductInfoList;
