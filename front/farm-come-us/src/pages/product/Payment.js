import React, { useEffect } from "react";
import classes from "./style/Payment.module.scss";
import Card from "../../components/common/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import axios from "axios";

const customerData = {
  customerName: "김덕배",
  customerPhoneNumber: "010-5251-1234",
  customerAddress: "대전광역시 유성구 온천북로7 레자미멀티홈 102-892",
};
const orderData = {
  storeName: "애플 인 더 청송",
  productName: "[청송] 무농약 당도 높은 가능 사과, 3Kg",
  option: "3",
  productCost: "134400",
  deliveryCost: "2500",
  // totalCost: parseInt(orderData.productCost) + parseInt(orderData.deliveryCost),
};

const Payment = () => {
  const location = useLocation();

  const shippingfee = 2500;

  const resultPrice = location.state.price + shippingfee;
  // 😀더미테스트 후 주석제거필요.

  // 수정필요 - axios.post()
  // store의 정보에 fetch해서 기본배송비, 배송비 무시 가격 받아오기.

  const orderRequest = async () => {
    // const data = {
    //   item_id: userId,
    //   member_id: password,
    // };
    const params = { item_id: 1, member_id: 1, orderCount: 1 };
    // const config = [];
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };
    try {
      const res = await axios.post("/api/v1/order", params);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    orderRequest();
  });

  const navigate = useNavigate();
  console.log(location);
  console.log(location.state);

  // const kakaoPayRequest = () => {
  //   // axios 요청을, url, payload, config 담아서 보낸다.
  //   axios
  //     .post(
  //       "/api/kakao/kakaopay",
  //       JSON.stringify({
  //         cid: "TC0ONETIME",
  //         partner_order_id: userInfo.username, //백엔드에서 hash처리
  //         partner_user_id: userInfo.username, //백엔드에서 hash처리
  //         item_name: itemName,
  //         item_code: itemCode.join(),
  //         quantity: quantity,
  //         total_amount: totalAmount,
  //         //   vat_amount: 200, 필수아님, 자동계산
  //         tax_free_amount: 0,
  //         approval_url: "http://localhost:3000/payresult",
  //         fail_url: "http://localhost:3000/payfail",
  //         cancel_url: "http://localhost:3000/paycancel",
  //       }),
  //       config
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       if (response.status === 200) {
  //         window.localStorage.setItem("tid", response.data.tid);
  //         //   window.location.href = response.data.next_redirect_pc_url;
  //         window.location.href = response.data.next_redirect_mobile_url;
  //         // 받아온 url로 넘김. (app.js의 router 통해서 분기처리된다. fail,cancel,)
  //       }
  //     })
  //     .catch((error) => {
  //       // 예외처리 추가 예정
  //       console.log(error);
  //     });
  // };

  // 😀 1번 함수
  // async function kakaoPayRequest() {
  //   try {
  //     const accessToken = sessionStorage.getItem("accessToken");
  //     const response = axios({
  //       method: "post",
  //       url: process.env.REACT_APP_API_SERVER_URL + "/kakaopay",
  //       data: {
  //         kaKaoPayDTO: {
  //           itemName: 1,
  //           memberId: 3,
  //           orderId: 2,
  //           quantity: 1,
  //           tax: 0,
  //           totalAmount: 3000,
  //           // orderInfoDtoList: [null],
  //         },
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         token: accessToken,
  //       },
  //     });
  //     console.log(response);
  //   } catch (err) {
  //     console.err(err);
  //   }
  // }

  // 😀2번 함수
  async function kakaoPayRequest() {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        token: accessToken,
      };
      const response = axios.post(
        process.env.REACT_APP_API_SERVER_URL + "/api/v1/kakaopay",
        {
          kaKaoPayDTO: {
            itemName: 1,
            memberId: 3,
            orderId: 2,
            quantity: 1,
            tax: 0,
            totalAmount: 3000,
            // orderInfoDtoList: [null],
          },
        },
        { headers: headers }
      );

      console.log(response);
    } catch (err) {
      console.err(err);
    }
  }

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
          <div className={classes.username}>{customerData.customerName}</div>
          <div className={classes.userphonenumber}>
            {customerData.customerPhoneNumber}
          </div>
          <div className={classes.useraddress}>
            {customerData.customerAddress}
          </div>
        </div>
      </Card>
      <Card className={classes.paymentcard}>
        <div className={classes.cardheader}>주문상품</div>
        <div className={classes.cardscript}>
          <div className={classes.storename}>
            {location.state.storename}
            {/* 더미스토어이름 */}
          </div>
          <div className={classes.productname}>
            {location.state.productname}
            {/* 더미상품이름 */}
          </div>
          <div className={classes.option}>
            <div className={classes.options}>
              옵션:
              {location.state.amount}개
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
        <div className={classes.buttonspace} onClick={kakaoPayRequest}>
          <div className={classes.button}>카카오페이로 결제하기</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
