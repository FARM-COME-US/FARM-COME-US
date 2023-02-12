import React, { useState, useEffect } from "react";
import classes from "./style/ProductList.module.scss";
import ProductItem from "./ProductItem";
import { productList } from "../../utils/api/product-http";

const ProductList = (props) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    async function getItemList(category, subCategory) {
      try {
        const categoryList = await productList(category, subCategory);
        console.log(categoryList);
        setItemList(categoryList);
      } catch (err) {
        console.log(err);
      }
    }

    getItemList(props.category_name, props.sub_category_name);
  }, [props.category_name, props.sub_category_name]);

  if (itemList.length === 0) {
    return <span>등록된 상품이 없습니다.</span>;
  } else if (itemList.length > 0) {
    console.log("렌더링 성공");
    const content = itemList.map((item) => (
      <ProductItem key={item.item_id} item={item} />
    ));
    return <ul className={`${classes.productList}`}>{content}</ul>;
  }

  /*
  if (itemLIst.length === 0) {
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
  */
};

export default ProductList;
