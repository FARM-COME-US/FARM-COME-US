import React, { useState, useEffect } from "react";
import classes from "./style/StoreProducts.module.scss";
import StoreProductList from "../../components/store/StoreProductList";
import { useLocation } from "react-router-dom";
import { storeProductList } from "../../utils/api/product-http";

const StoreProducts = () => {
  const [itemList, setItemList] = useState({});

  const location = useLocation();

  useEffect(() => {
    async function getItemList() {
      try {
        const itemArr = await storeProductList(0, 4, location.state.storeId);
        setItemList(itemArr);
      } catch (err) {
        console.log(err);
      }
    }

    getItemList();
  }, [location.state.storeId]);

  if (itemList.itemList) {
    return (
      <div className={classes.container}>
        <StoreProductList productList={itemList}></StoreProductList>
      </div>
    );
  }
};

export default StoreProducts;
