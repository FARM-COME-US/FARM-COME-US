import React from "react";
import classes from "./style/ProductDetail.module.scss";
import Card from "../../components/common/Card";
import {CgShoppingCart} from "react-icons/cg";

const ProductDetail = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>store name</div>
      <Card className={classes.imagecard}>
        <img src="https://via.placeholder.com/300" alt="공백"></img>
      </Card>
      <div className={classes.productname}>title</div>
      <div className={classes.productscript}>script</div>
      <div className={classes.option}>
        <div className={classes.discountspace}>
          <div className={classes.salepercent}>20%</div>
          <div className={classes.originalprice}>20000원</div>
        </div>
        <div className={classes.saleprice}>16000</div>
        <div className={classes.won}>원</div>
        <div className={classes.selectamount}>
          <div className={classes.firstblock}>-</div>
          <div className={classes.secondblock}></div>
          <div className={classes.thirdblock}>+</div>
        </div>
      </div>
      <div className={classes.finalprice}>
        <div className={classes.firstblock}>총 상품 금액:</div>
        <div className={classes.secondblock}>16000</div>
        <div className={classes.thirdblock}>원</div>
      </div>
      <div className={classes.buttonspace}>
        <div className={classes.cartbutton}>
          <CgShoppingCart className={classes.carticon}/>
        </div>
        <div className={classes.buybutton}>구매하기</div>
      </div>
    </div>
  );
};

export default ProductDetail;