import React from "react";
import classes from "./style/ProductList.module.scss";
import ProductItem from "./ProductItem";

const ProductList = (props) => {
  if (props.list.length === 0) {
    return <span>등록된 상품이 없습니다.</span>;
  } else if (props.firstId === 0) {
    const content = props.list.map((item) => (
      <ProductItem key={item.productId} product={item} />
    ));
    return <ul className={`${classes.productList}`}>{content}</ul>;
  } else if (props.firstId > 0) {
    if (props.secondId === 0) {
      const filterContent = props.list.filter(
        (item) => item.mainCategoryId === props.firstId
      );
      const mapFilterContent = filterContent.map((item) => (
        <ProductItem key={item.productId} product={item} />
      ));
      return <ul className={`${classes.productList}`}>{mapFilterContent}</ul>;
    } else if (props.secondId > 0) {
      const firstFilterContent = props.list.filter(
        (item) => item.mainCategoryId === props.firstId
      );
      const secondFilterContent = firstFilterContent.filter(
        (item) => item.subCategoryId === props.secondId
      );
      const mapFilterContent = secondFilterContent.map((item) => (
        <ProductItem key={item.productId} product={item} />
      ));
      return <ul className={`${classes.productList}`}>{mapFilterContent}</ul>;
    }
  }
};

export default ProductList;
