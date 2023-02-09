import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "../common/Button";

const KakaoPayment = (props) => {
  const itemData = useSelector((state) => state.state.userSlice);
  //   itemData대신 cartSlice 만들어서 넣어놔야함. 아니면, useParam써서 아이템, 개수 넣어서 넘기던지
  const userInfo = useSelector((state) => state.state.userSlice);
  const [itemCode, setItemCode] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    // 최초 렌더링시, 결제 요청한 아이템들 돌면서, itemcode, 개수, 총액 맞춰주는 함수.
    itemData.map((item) => {
      setItemCode((itemCode) => [...itemCode, item.itemCode]);
      setQuantity((quantity) => quantity + item.count);
      setTotalAmount((totalAmount) => totalAmount + item.price);
    });
    // map안에서 setState사용 되나?
    setItemName(itemData[0]?.itemName);
    // itemData는 배열인가보네
  }, []);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const kakaoPay = () => {
    // axios 요청을, url, payload, config 담아서 보낸다.
    axios
      .post(
        "/credit/KakaoPay/ready",
        JSON.stringify({
          cid: "TC0ONETIME",
          partner_order_id: userInfo.username, //백엔드에서 hash처리
          partner_user_id: userInfo.username, //백엔드에서 hash처리
          item_name: itemName,
          item_code: itemCode.join(),
          quantity: quantity,
          total_amount: totalAmount,
          //   vat_amount: 200, 필수아님, 자동계산
          tax_free_amount: 0,
          approval_url: "http://localhost:3000/payresult",
          fail_url: "http://localhost:3000/payfail",
          cancel_url: "http://localhost:3000/paycancel",
        }),
        config
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.localStorage.setItem("tid", response.data.tid);
          //   window.location.href = response.data.next_redirect_pc_url;
          window.location.href = response.data.next_redirect_mobile_url;
          // 받아온 url로 넘김. (app.js의 router 통해서 분기처리된다. fail,cancel,)
        }
      })
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  };
  return (
    <div>
      <div>결제 상세</div>
      <div>카카오페이 결제를 눌러 결제를 진행하세요</div>
      <div>
        <div>상품</div>
        <div>{quantity}개</div>
      </div>
      <div>
        {totalAmount}
        <span>₩</span>
      </div>
      <div>* 세금 및 수수료 포함</div>
      <Button onClick={() => kakaoPay()}>카카오페이 결제</Button>
    </div>
  );
};

export default KakaoPayment;
