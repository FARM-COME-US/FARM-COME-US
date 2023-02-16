import React, { useState, useEffect } from "react";
import classes from "./style/StoreProducts.module.scss";
import StoreProductList from "../../components/store/StoreProductList";
import { useLocation } from "react-router-dom";
import { fetchProductList } from "../../utils/api/product-http";

const StoreProducts = () => {
  const [itemList, setItemList] = useState([]);

  const location = useLocation();

  if (itemList.length > 0) {
    return (
      <div className={classes.container}>
        {/* <StoreProductList productList={itemList}></StoreProductList> */}
      </div>
    );
  }
};

export default StoreProducts;
