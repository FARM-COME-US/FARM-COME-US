import React from "react";
import classes from "./style/ProductList.module.scss";
import ProductItem from "./ProductItem";

const ProductList = (props) => {
  if (props.ITEM_LIST.length === 0) {
    return <span>등록된 상품이 없습니다.</span>;
  } else if (props.category_id === 0) {
    const content = props.ITEM_LIST.map((item) => (
      <ProductItem key={item.item_id} item={item} />
    ));
    return <ul className={`${classes.productList}`}>{content}</ul>;
  } else if (props.category_id > 0) {
    if (props.sub_category_id === 0) {
      const filterContent = props.ITEM_LIST.filter(
        (item) => item.category_id === props.category_id
      );
      const mapFilterContent = filterContent.map((item) => (
        <ProductItem key={item.item_id} item={item} />
      ));
      return <ul className={`${classes.productList}`}>{mapFilterContent}</ul>;
    } else if (props.sub_category_id > 0) {
      const firstFilterContent = props.ITEM_LIST.filter(
        (item) => item.category_id === props.category_id
      );
      const secondFilterContent = firstFilterContent.filter(
        (item) => item.subCategoryId === props.sub_category_id
      );
      const mapFilterContent = secondFilterContent.map((item) => (
        <ProductItem key={item.item_id} item={item} />
      ));
      return <ul className={`${classes.productList}`}>{mapFilterContent}</ul>;
    }
  }
};

export default ProductList;
