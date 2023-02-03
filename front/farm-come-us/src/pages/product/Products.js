import React, { useState } from "react";
import Category from "../../components/product/Category.js";
import SubCategory from "../../components/product/SubCategory.js";
import ProductList from "../../components/product/ProductList.js";

const CATEGORY_LIST = [
  { Name: "전체", Id: 0 },
  { Name: "과일", Id: 1 },
  { Name: "채소", Id: 2 },
  { Name: "곡식", Id: 3 },
  { Name: "나물", Id: 4 },
  { Name: "몰?루 1", Id: 5 },
  { Name: "몰?루 2", Id: 6 },
  { Name: "아!루", Id: 7 },
  { Name: "몰?루 3", Id: 8 },
];

const SUBCATEGORY_LIST = [
  { Name: "sub1", Id: 1 },
  { Name: "sub2", Id: 2 },
  { Name: "sub3", Id: 3 },
  { Name: "sub4", Id: 4 },
  { Name: "sub5", Id: 5 },
  { Name: "sub6", Id: 6 },
  { Name: "sub7", Id: 7 },
  { Name: "sub8", Id: 8 },
  { Name: "sub9", Id: 9 },
  { Name: "sub10", Id: 10 },
  { Name: "sub11", Id: 11 },
  { Name: "sub12", Id: 12 },
  { Name: "sub13", Id: 13 },
  { Name: "sub14", Id: 14 },
  { Name: "sub15", Id: 15 },
  { Name: "sub16", Id: 16 },
  { Name: "sub17", Id: 17 },
  { Name: "sub18", Id: 18 },
  { Name: "sub19", Id: 19 },
  { Name: "sub20", Id: 20 },
];

const PRODUCT_LIST = [
  {
    mainCategoryId: 1,
    subCategoryId: 1,
    productId: 1,
    productName: "[청송] 무농약 당도 높은 가을 사과, 박스",
    discount: 0,
    price: 44800,
    unit: 1,
    storeId: 1,
    storeName: "애플 인 더 청송",
  },
  {
    mainCategoryId: 1,
    subCategoryId: 2,
    productId: 2,
    productName: "[청송] 무농약 당도 높은 가을 사과, 박스",
    discount: 0,
    price: 44800,
    unit: 1,
    storeId: 2,
    storeName: "애플 인 더 청송",
  },
  {
    mainCategoryId: 2,
    subCategoryId: 1,
    productId: 3,
    productName: "[청송] 무농약 당도 높은 가을 사과, 박스",
    discount: 0,
    price: 44800,
    unit: 1,
    storeId: 3,
    storeName: "애플 인 더 청송",
  },
];

const Products = () => {
  const [idState, setState] = useState({
    firstId: 0,
    secondId: 0,
  });

  const getId = (id) => {
    setState({ firstId: id });
    console.log(`firstId ${idState.firstId} secondId ${idState.secondId}`);
  };

  const getSecondId = (id) => {
    setState({ ...idState, secondId: id });
    console.log(`firstId ${idState.firstId} secondId ${idState.secondId}`);
  };

  return (
    <div>
      <Category list={CATEGORY_LIST} getid={getId} />
      <SubCategory
        list={SUBCATEGORY_LIST}
        firstId={idState.firstId}
        getsecondid={getSecondId}
      ></SubCategory>
      <ProductList
        list={PRODUCT_LIST}
        firstId={idState.firstId}
        secondId={idState.secondId}
      />
    </div>
  );
};

export default Products;
