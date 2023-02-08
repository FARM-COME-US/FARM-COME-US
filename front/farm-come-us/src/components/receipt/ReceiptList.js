import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReceiptCard from "./ReceiptCard";

import { MdOutlineArrowBackIos } from "react-icons/md";

import classes from "./style/ReceiptList.module.scss";

const ReceiptList = (props) => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const reciptCards = <div>주문 내역이 없습니다.</div>;

  return (
    <div className={classes.screen}>
      <div className={classes.upperCard}>
        <div className={classes.flexrow}>
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <MdOutlineArrowBackIos className={classes.backButton} />
          </div>
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
        <div
          className={`${classes.orderinfo} ${classes.orderLength} ${classes.orderlength}`}
        >
          상품 {"order.length"} 개
        </div>
      </div>
      <div className={classes.flexR}></div>

      <ReceiptCard />
    </div>
  );
};

export default ReceiptList;
