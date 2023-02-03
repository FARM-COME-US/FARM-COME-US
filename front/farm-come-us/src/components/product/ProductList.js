import React from "react";

import classes from "./style/ProductList.module.scss";

import ProductItem from "./ProductItem";

const ProductList = (props) => {
  const content = props.list.map((item) => (
    <ProductItem key={item.productId} product={item} />
  ));

  if (content.length === 0) {
    return <span>등록된 상품이 없습니다.</span>;
  } else if (props.firstId === 0) {
    return <ul className={`${classes.productList}`}>{content}</ul>;
  } else if (props.firstId > 0) {
    const filterContent1 = content.filter(
      (item) => item.mainCategoryId === props.firstId
    );
    console.log(filterContent1);

    const filterContent2 = filterContent1.map((item) => (
      <ProductItem key={item.productId} product={item} />
    ));
    console.log(filterContent2);

    return <ul className={`${classes.productList}`}>{filterContent2}</ul>;
  }
};

export default ProductList;
