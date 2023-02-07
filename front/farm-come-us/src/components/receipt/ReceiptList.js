import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReceiptCard from "./ReceiptCard";
import { MdOutlineArrowBackIos } from "react-icons/md";
import classes from "./style/ReceiptList.module.scss";

const ReceiptList = (props) => {
  useEffect(() => {}, []);

  const asd = [];

  return (
    <div className={classes.screen}>
      <div className={classes.upperCard}>
        <div className={classes.flexrow}>
          <MdOutlineArrowBackIos className={classes.backButton} />
          <div className={classes.backButton}>주문상세</div>
        </div>
        <div className={classes.orderInfoMt}>
          <div
            className={classes.orderinfo}
          >{`주문번호 : ${"props.orderid 1084165156"}`}</div>
          <div
            className={classes.orderinfo}
          >{`구매일 : ${"props.orderDate 2023. 01. 18 16:02:19"}`}</div>
        </div>
      </div>
      <div className={`${classes.orderinfo} ${classes.orderLength}`}>
        상품 {"order.length"} 개
      </div>
      영수증목록 페이지
    </div>
  );
};

export default ReceiptList;
