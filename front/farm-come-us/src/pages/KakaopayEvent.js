import React from "react";
import axios from "axios";
// import { KakaoPayment } from '../components/kakaopay/KakaoPay.js'
import classes from "./style/KakaopayEvent.module.scss";

const KakaopayEvent = (props) => {
  const kakaoClick = async () => {
    try {
      axios
        .get(process.env.REACT_APP_API_SERVER_URL + "/api/v1/pay/kakaoreq", {
          params: {
            itemCount: props.itemCount,
            memberId: props.memberId,
            orderId: props.orderId,
          },
        })
        .then((response) => {
          const setUrl = response.data.next_redirect_pc_url;
          const tid = response.data.tid;

          console.log(setUrl);
          console.log(tid);
          try {
            console.log("tid 주기");
            axios.put(
              process.env.REACT_APP_API_SERVER_URL +
                `/api/v1/pay/tid?tid=${tid}&orderId=${props.orderId}`
            );
          } catch (err) {
            console.log(err);
          }

          if (setUrl) {
            window.open(setUrl);
          } else {
            console.log("안됨");
          }
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.err(err);
    }
  };
  return (
    <div className={classes.buttonspace} onClick={kakaoClick}>
      <div className={classes.button}>카카오페이로 결제하기</div>
    </div>
  );
};

export default KakaopayEvent;
