import React from "react";
import axios from "axios";
// import { KakaoPayment } from '../components/kakaopay/KakaoPay.js'

const Test = () => {
  const kakaoClick = async () => {
    try {
        axios
        .get(
            `http://localhost:9090/api/v1/pay/kakaoreq?itemCount=1&memberId=2&orderId=35`,
        )
        .then((response) => {
            const setUrl = response.data.next_redirect_pc_url;
            const tid = response.data.tid;

            console.log(setUrl)
            console.log(tid)
            try {
                console.log("tid 주기")
                axios
                .put (
                    `http://localhost:9090/api/v1/pay/tid?tid=${tid}&orderId=35`
                )
            } catch (err) {
                console.log(err);
            }
            
            if (setUrl) {
                window.open(setUrl)
                
            } else {
                console.log("안됨")
            }
        })
        .catch((error) => console.log(error))
    


      } catch (err) {
        console.err(err);
      }
};
  return (
    <div>
      <button onClick={kakaoClick}>
        보내기
      </button>
    </div>
  );
};

export default Test;