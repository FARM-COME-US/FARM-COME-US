import React from "react";
import classes from "./style/Payment.module.scss";
import Card from "../../components/common/Card";

const paymentdata = {
  storename: "작은 언니네 과수원",
  productname: "저탄소 GAP 정성사과 2.5kg",
  option: 2,
  price: 43200,
}

const Payment = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>주문 / 결제</div>
      <Card className={classes.paymentcard}>
        <div className={classes.cardheader}>배송지</div>
        <div className={classes.cardscript}>
          <div className={classes.username}>김덕배</div>
          <div className={classes.userphonenumber}>010-5251-1234</div>
          <div className={classes.useraddress}>대전광역시 유성구 온천북로7 레자미멀티홈 102-892</div>
          <div className={classes.changeaddressbutton}>배송지 변경</div>
        </div>
      </Card>
      <Card className={classes.paymentcard}>
        <div className={classes.cardheader}>주문상품</div>
        <div className={classes.cardscript}>
          <div className={classes.storename}>{paymentdata.storename}</div>
          <div className={classes.productname}>{paymentdata.productname}</div>
          <div className={classes.option}>
            <div className={classes.options}>옵션: {paymentdata.option}개</div>
            <div className={classes.price}>{paymentdata.price}원</div>
          </div>
        </div>
        <div className={classes.shippingfee}>
          <div className={classes.defaultscript}>총 배송비</div>
          <div className={classes.price}>2500원</div>
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