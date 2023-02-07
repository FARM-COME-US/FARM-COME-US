import React from "react";
import classes from "./style/Payment.module.scss";
import Card from "../../components/common/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

const Payment = () => {
  const location = useLocation();

  const shippingfee = 2500;

  const resultPrice = location.state.price + shippingfee;

  const navigate = useNavigate();

  const convertedPrice = (price) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <MdOutlineArrowBackIos
          onClick={() => navigate(-1)}
        ></MdOutlineArrowBackIos>
        <div>주문 / 결제</div>
      </div>
      <Card className={classes.paymentcard}>
        <div className={classes.cardheader}>배송지</div>
        <div className={classes.cardscript}>
          <div className={classes.username}>김덕배</div>
          <div className={classes.userphonenumber}>010-5251-1234</div>
          <div className={classes.useraddress}>
            대전광역시 유성구 온천북로7 레자미멀티홈 102-892
          </div>
        </div>
      </Card>
      <Card className={classes.paymentcard}>
        <div className={classes.cardheader}>주문상품</div>
        <div className={classes.cardscript}>
          <div className={classes.storename}>{location.state.storename}</div>
          <div className={classes.productname}>
            {location.state.productname}
          </div>
          <div className={classes.option}>
            <div className={classes.options}>
              옵션: {location.state.amount}개
            </div>
            <div className={classes.price}>
              {convertedPrice(location.state.price)}원
            </div>
          </div>
        </div>
        <div className={classes.shippingfee}>
          <div className={classes.defaultscript}>총 배송비</div>
          <div className={classes.price}>2500원</div>
        </div>
        <div className={classes.bill}>
          <div className={classes.defaultscript}>총 주문 금액</div>
          <div className={classes.price}>{convertedPrice(resultPrice)}원</div>
        </div>
      </Card>
      <div className={classes.foot}>
        <div className={classes.text}>
          주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
        </div>
        <div className={classes.buttonspace}>
          <div className={classes.button}>카카오페이로 결제하기</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
