import React from "react";
import classes from "./style/StoreProductList.module.scss";
import StoreProductItem from "./StoreProductItem";

const StoreProductList = (props) => {
  let list = <span>등록된 라이브가 없습니다.</span>;

  if (props.productList && props.productList.length > 0) {
    list = props.productList.map((item) => (
      <StoreProductItem key={item.liveId} product={item} />
    ));
  }

  return <ul className={classes.productlist}>{list}</ul>;
};

export default StoreProductList;
