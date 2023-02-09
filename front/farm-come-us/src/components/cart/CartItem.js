import React, { useState } from "react";
import classes from "./style/CartItem.module.scss";

const CartItem = (props) => {
  const [productIdList, setList] = useState([]);

  const appendSetList = () => {
    setList([...productIdList, props.item.productId]);
    console.log(productIdList);
  };

  const removeSetList = (id) => {
    setList(productIdList.filter((id) => productIdList !== id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.buttonSpace}>
        <div className={classes.button} onClick={appendSetList}></div>
      </div>
      <div className={classes.imgSpace}>
        <img src="https://via.placeholder.com/300" alt="productImg" />
      </div>
      <div className={classes.itemDes}>
        <div className={classes.topSpace}>
          <div>{props.item.productName}</div>
        </div>
        <div className={classes.middleSpace}>
          <div className={classes.option}>
            옵션: {props.item.productOption}개
          </div>
          <div className={classes.secondSpace}>
            <div className={classes.discount}>{props.item.discount}%</div>
            <div className={classes.price}>{props.item.price}</div>
          </div>
        </div>
        <div className={classes.bottomSpace}>
          <div className={classes.discountPrice}>
            {props.item.discountPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
