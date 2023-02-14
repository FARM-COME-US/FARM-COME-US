import React, { useState, useEffect } from "react";
import classes from "./style/StoreProducts.module.scss";
import StoreProductList from "../../components/store/StoreProductList";
import { useLocation } from "react-router-dom";
import { fetchProductList } from "../../utils/api/product-http";

const StoreProducts = () => {
  const [itemList, setItemList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    async function getItemList() {
      try {
        const itemArr = await fetchProductList(1, 1, location.state.storeId);
        console.log(itemArr);
        setItemList(itemArr);
      } catch (err) {
        console.log(err);
      }
    }

    getItemList();
  }, [location.state.storeId]);

  if (itemList.length > 0) {
    return (
      <div className={classes.container}>
        <StoreProductList productList={itemList}></StoreProductList>
      </div>
    );
  }
};

export default StoreProducts;
