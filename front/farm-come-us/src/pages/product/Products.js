import React from "react";
import Category from "../../components/product/Category.js";
import ProductList from "../../components/product/ProductList.js";
import SubCategory from "../../components/product/SubCategory.js";

const categoryList = [
  { categoryName: "전체", categoryId: 0 },
  { categoryName: "과일", categoryId: 1 },
  { categoryName: "채소", categoryId: 2 },
  { categoryName: "곡식", categoryId: 3 },
  { categoryName: "나물", categoryId: 4 },
  { categoryName: "몰?루 1", categoryId: 5 },
  { categoryName: "몰?루 2", categoryId: 6 },
  { categoryName: "아!루", categoryId: 7 },
  { categoryName: "몰?루 3", categoryId: 8 },
];

const productList = [
  {
    productId: 1,
    productName: "[청송] 무농약 당도 높은 가을 사과, 박스",
    discount: 0,
    price: 44800,
    unit: 1,
    storeId: 1,
    storeName: "애플 인 더 청송",
  },
  {
    productId: 2,
    productName: "[청송] 무농약 당도 높은 가을 사과, 박스",
    discount: 0,
    price: 44800,
    unit: 1,
    storeId: 2,
    storeName: "애플 인 더 청송",
  },
  {
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
  return (
    <div>
      <Category list={categoryList} />
      <SubCategory />
      <ProductList list={productList} />
    </div>
  );
};

export default Products;
