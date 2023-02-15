import React, { useState, useEffect } from "react";
import classes from "./style/StoreProducts.module.scss";
import StoreProductList from "../../components/store/StoreProductList";
import { useLocation } from "react-router-dom";
import { fetchStoreProducts } from "../../utils/api/product-http";

const StoreProducts = () => {
  const [itemList, setItemList] = useState({});

  const location = useLocation();

  useEffect(() => {
    async function getItemList() {
      try {
        const itemArr = await fetchStoreProducts(location.state.storeId, 0, 6);
        setItemList(itemArr);
      } catch (err) {
        console.log(err);
      }
    }

    getItemList();
  }, [location.state.storeId]);

  if (itemList.data) {
    console.log(itemList.data);
    return (
      <div className={classes.container}>
        <StoreProductList productList={itemList}></StoreProductList>
      </div>
    );
  }
};

export default StoreProducts;
