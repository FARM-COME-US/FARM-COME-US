import React, { useState, useEffect } from "react";
import classes from "./style/ProductList.module.scss";
import ProductItem from "./ProductItem";
import { productList } from "../../utils/api/product-http";

const ProductList = (props) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    async function getItemList(category, itemName, subCategory, page, size) {
      try {
        const categoryList = await productList(
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

  if (itemList.length === 0) {
    return <span></span>;
  } else if (itemList.length > 0) {
    const content = itemList.map((item) => (
      <ProductItem key={item.item_id} item={item} />
    ));
    return <ul className={`${classes.productList}`}>{content}</ul>;
  } else {
    console.log("렌더링 실패");
  }
};

export default ProductList;
