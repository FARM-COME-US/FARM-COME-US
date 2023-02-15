import { useEffect } from "react";
import classes from "./style/MyReceiptDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

const MyReceiptDetail = () => {
  const param = useParams();
  const navigate = useNavigate();
  console.log(param);

  return (
    <div className={classes.screen}>
      영수증 디테일 화면입니다.
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
          >{`구매일자 : ${"props.orderDate 2023. 01. 18 16:02:19"}`}</div>
        </div>
        <div
          className={`${classes.orderinfo} ${classes.orderLength} ${classes.orderlength}`}
        >
          상품 {"order.length"} 개
        </div>
      </div>
      <div>만들고 있습니다</div>
    </div>
  );
};

export default MyReceiptDetail;
