import React from "react";

import classes from "./style/ProductItem.module.scss";

import Card from "../common/Card";

const ProductItem = (props) => {
  return (
    <li className={`${classes.productItem}`}>
      <Card className={`${classes.productCard}`}>
        <img src={props.product.savedPath} alt="product-img" />
        <div className={`${classes.productInfo}`}>
          <div className={`${classes.productName}`}>
            {props.product.itemName}
          </div>
          <div className={`${classes.priceInfo}`}>
            <span className={`${classes.discount}`}>
              {`${props.product.itemDiscount}%`}
            </span>
            <span>{`${props.product.itemPrice}원`}</span>
          </div>
          <div className={`${classes.storeInfo}`}>
            <span className={`${classes.storeName}`}>
              {props.product.storeName}
            </span>
            <span> 스토어</span>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
