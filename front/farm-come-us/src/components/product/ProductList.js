import React from "react";

import classes from "./style/ProductList.module.scss";

import ProductItem from "./ProductItem";

const ProductList = (props) => {
  const content =
    !props.list || props.list.length === 0 ? (
      <span>등록된 상품이 없습니다.</span>
    ) : (
      props.list.map((item) => (
        <ProductItem key={item.productId} product={item} />
      ))
    );

  return <ul className={`${classes.productList}`}>{content}</ul>;
};

export default ProductList;
