import React, { useState } from "react";
import Category from "../../components/product/Category.js";
import SubCategory from "../../components/product/SubCategory.js";
import ProductList from "../../components/product/ProductList.js";

const CATEGORY_LIST = [
  { category_name: "전체", category_id: 0 },
  { category_name: "과일", category_id: 1 },
  { category_name: "채소", category_id: 2 },
  { category_name: "곡식", category_id: 3 },
  { category_name: "나물", category_id: 4 },
  { category_name: "몰?루 1", category_id: 5 },
  { category_name: "몰?루 2", category_id: 6 },
  { category_name: "아!루", category_id: 7 },
  { category_name: "몰?루 3", category_id: 8 },
];

const SUB_CATEGORY_LIST = [
  { sub_category_name: "전체", sub_category_id: 0 },
  { sub_category_name: "sub2", sub_category_id: 1 },
  { sub_category_name: "sub3", sub_category_id: 2 },
  { sub_category_name: "sub4", sub_category_id: 3 },
  { sub_category_name: "sub5", sub_category_id: 4 },
  { sub_category_name: "sub6", sub_category_id: 5 },
  { sub_category_name: "sub7", sub_category_id: 6 },
  { sub_category_name: "sub8", sub_category_id: 7 },
  { sub_category_name: "sub9", sub_category_id: 8 },
  { sub_category_name: "sub10", sub_category_id: 9 },
  { sub_category_name: "sub11", sub_category_id: 10 },
  { sub_category_name: "sub12", sub_category_id: 11 },
  { sub_category_name: "sub13", sub_category_id: 12 },
  { sub_category_name: "sub14", sub_category_id: 13 },
  { sub_category_name: "sub15", sub_category_id: 14 },
  { sub_category_name: "sub16", sub_category_id: 15 },
  { sub_category_name: "sub17", sub_category_id: 16 },
  { sub_category_name: "sub18", sub_category_id: 17 },
  { sub_category_name: "sub19", sub_category_id: 18 },
  { sub_category_name: "sub20", sub_category_id: 19 },
];

const ITEM_LIST = [
  {
    category_id: 1,
    sub_category_id: 1,
    item_id: 1,
    item_name: "[청송] 무농약 당도 높은 가을 사과, 박스",
    item_description: "",
    item_image: "",
    item_discount: 0,
    item_price: 44800,
    unit: 1,
    store_id: 1,
    store_name: "애플 인 더 청송",
  },
  {
    category_id: 1,
    sub_category_id: 2,
    item_id: 2,
    item_name: "[청송] 무농약 당도 높은 가을 배, 박스",
    item_description: "",
    item_image: "",
    item_discount: 0,
    item_price: 44800,
    unit: 1,
    store_id: 2,
    store_name: "페어 인 더 청송",
  },
  {
    category_id: 2,
    sub_category_id: 1,
    item_id: 3,
    item_name: "[청송] 무농약 당도 높은 가을 감, 박스",
    item_description: "",
    item_image: "",
    item_discount: 0,
    item_price: 44800,
    unit: 1,
    store_id: 3,
    store_name: "퍼시먼 인 더 청송",
  },
];

const Products = () => {
  const [categoryIdState, setCategoryId] = useState(0);
  const [subCategoryIdState, setSubCategoryId] = useState(0);

  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  const getSubCategoryId = (id) => {
    setSubCategoryId(id);
  };

  return (
    <div>
      <Category list={CATEGORY_LIST} getCategoryId={getCategoryId} />
      <SubCategory
        SUB_CATEGORY_LIST={SUB_CATEGORY_LIST}
        category_id={categoryIdState}
        getSubCategoryId={getSubCategoryId}
      ></SubCategory>
      <ProductList
        ITEM_LIST={ITEM_LIST}
        category_id={categoryIdState}
        sub_category_id={subCategoryIdState}
      />
    </div>
  );
};

export default Products;
