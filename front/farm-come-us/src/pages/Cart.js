import React from "react";
import classes from "./style/Cart.module.scss";
import Card from "../components/common/Card";

const Cart = () => {
  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <div className={classes.title}>장바구니</div>
      </div>
      <div className={classes.body}>
        <div className={classes.bodyhead}>
          <input type="checkbox" />
          <div className={classes.boxtext}>전체 선택</div>
          <div className={classes.deletetext}>선택 삭제</div>
        </div>
        <Card className={classes.cartcard}>
          <div className={classes.cardhead}>
            <input type="checkbox" />
            <div className={classes.storename}>title</div>
            <div className={classes.productcount}>상품 n개</div>
          </div>
          <div className={classes.cardbody}>
            <input type="checkbox" />
            <div className={classes.imgline}>
              <div className={classes.imgbox}></div>
            </div>
            <div className={classes.script}>
              <div className={classes.firstline}>
                <div className={classes.productname}>상품 이름</div>
                <div className={classes.poductweight}>무게</div>
              </div>
              <div className={classes.secondline}>
                <div className={classes.discountrate}>할인률</div>
                <div className={classes.originalprice}>정가</div>
              </div>
              <div className={classes.thirdline}>
                <div className={classes.discountprice}>할인가</div>
              </div>
            </div>
          </div>
          <div className={classes.cardfoot}>
            <div className={classes.shippingfee}>배송비 2500원</div>
            <div className={classes.secondline}>
              <div className={classes.defaulttext}>총 금액</div>
              <div className={classes.price}>200,000원</div>
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.foot}>
        <div className={classes.pricetext}>전체 결제 금액: 200,000</div>
        <div className={classes.buybutton}>구매하기</div>
      </div>
    </div>
  );
};

export default Cart;
