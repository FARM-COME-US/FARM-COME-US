import React from "react";
import Category from "../../components/product/Category.js";
import RankSwitch from "../../components/product/RankSwitch.js";
import ProductList from "../../components/product/ProductList.js";

const Products = () => {
  return(
    <div>
      <Category />
      <RankSwitch />
      <ProductList />
    </div>
  );
};


export default Products;