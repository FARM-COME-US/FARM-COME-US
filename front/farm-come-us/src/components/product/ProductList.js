import React, { useState, useEffect, Fragment } from "react";
import classes from "./style/ProductList.module.scss";
import ProductItem from "./ProductItem";
import { fetchProductList } from "../../utils/api/product-http";

import ProductNoData from "./ProductNoData";

const ProductList = (props) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    async function getItemList(category, itemName, subCategory, page, size) {
      try {
        const categoryList = await fetchProductList(
          category,
          itemName,
          subCategory,
          page,
          size
        );
        setItemList(categoryList);
      } catch (err) {
        console.log(err);
      }
    }

    getItemList(props.category_name, "", props.sub_category_name, 0, 8);
  }, [props.category_name, props.sub_category_name]);
  console.log(itemList);

  let content = <ProductNoData>등록된 상품이 없습니다.</ProductNoData>;

  if (itemList.length > 0) {
    content = itemList.map((item) => (
      <ProductItem key={item.itemId} item={item} />
    ));
  }

  return <ul className={`${classes.productList}`}>{content}</ul>;
};

export default ProductList;
