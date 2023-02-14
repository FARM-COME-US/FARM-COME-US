import React from "react";
import classes from "./style/StoreProductList.module.scss";
import StoreProductItem from "./StoreProductItem";

const StoreProductList = (props) => {
  console.log(props);
  let list = <span>등록된 상품이 없습니다.</span>;

  if (props.productList.itemList && props.productList.itemList.length > 0) {
    const imageList = props.productList.itemImage;
    list = props.productList.itemList.map((item) => (
      <StoreProductItem key={item.itemId} product={item} image={imageList} />
    ));
    return <ul className={classes.productlist}>{list}</ul>;
  }
};

export default StoreProductList;
