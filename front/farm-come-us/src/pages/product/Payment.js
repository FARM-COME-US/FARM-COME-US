import React from "react";
import classes from "./style/Payment.module.scss";
import Card from "../../components/common/Card";

const Payment = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>주문 / 결제</div>
      <Card className={classes.paymentcard}>
        <div className={classes.cardheader}>배송지</div>
        <div className={classes.cardscript}>
          <div>이름</div>
          <div>전화번호</div>
          <div>주소</div>
          <div className={classes.changeaddressbutton}>배송지 변경</div>
        </div>
      </Card>
      <Card className={classes.paymentcard}>
        <div className={classes.cardheader}>주문상품</div>
        <div className={classes.cardscript}>
          <div>가게 명</div>
          <div>상품 명</div>
          <div className={classes.option}>
            <div className={classes.options}>무게 | 갯수</div>
            <div className={classes.price}>18000원</div>
          </div>
        </div>
        <div className={classes.shippingfee}>
          <div className={classes.defaultscript}>총 배송비</div>
          <div className={classes.price}>2000원</div>
        </div>
        <div className={classes.bill}>
          <div className={classes.defaultscript}>총 주문 금액</div>
          <div className={classes.price}>20000원</div>
        </div>
      </Card>
      <div className={classes.foot}>  
        <div className={classes.text}>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</div>
        <div className={classes.button}>카카오페이로 결제하기</div>
      </div>
    </div>
  );
};

export default Payment;