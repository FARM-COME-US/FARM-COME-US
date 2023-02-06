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
        <select name="category">
          <option value="">카테고리 선택</option>
          {DUMMY_CATEGORY.map((category, idx) => (
            <option key={idx} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="상품명" type="text" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="가격" type="number" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="수량" type="number" />
      </li>
      <li className={classes.infoItem}>
        <MyStoreInput label="상품 상세정보" type="text" />
      </li>
    </ul>
  );
};

export default MyStoreProductInfoList;
