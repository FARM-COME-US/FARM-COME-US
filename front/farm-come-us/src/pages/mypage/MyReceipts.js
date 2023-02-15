import { useState, useEffect } from "react";
import MyReceiptItem from "../../components/mypage/MyReceiptItem";
import classes from "./style/MyReceipts.module.scss";
import { orderList } from "../../utils/api/order-http";
import axios from "axios";
import { useSelector } from "react-redux";

const res = orderList();
console.log(res);

const MyReceipts = (props) => {
  const [myReceiptsInfoArr, setReceiptsInfoArr] = useState([]);
  // receiptsInfoArr가 list형태의 객체들로 들어옵니다. [obj1, obj2... 이렇게.]
  // item1 = { id:orderId, items:[강원도배추, 제즈스윗당근], cost:429,000, orderdate:2023.01.10 21:12:58, }
  const memberId = useSelector((state) => state.userSlice.value.memberId);

  useEffect(() => {
    console.log(`멤버아이디${memberId}`);
    axios
      .get(process.env.REACT_APP_API_SERVER_URL + "/api/v1/order/", {
        params: { member: memberId },
      })
      .then((res) => {
        console.log("멤버아이디의 오더정보 불러온다.");
        console.log(res.data);
        setReceiptsInfoArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(res);
  }, []);
  const response = axios({
    method: "delete",
    url: process.env.REACT_APP_API_SERVER_URL + "/api/v1/order/",
    params: {
      //
      cartId: 1,
    },
  });
  console.log(response.success);

  let list = <div className={classes.noItem}>주문 내역이 없습니다.</div>;

  if (myReceiptsInfoArr.length > 0) {
    list = myReceiptsInfoArr.map((item) => (
      <MyReceiptItem key={item.id} info={item} />
    ));
  }

  // list = <MyReceiptItem />;

  return (
    <div className={classes.screen}>
      <div className={classes.header}>주문내역</div>

      <div
        className={`${classes.flexbox} ${classes.mt} ${
          myReceiptsInfoArr.length > 0
            ? ""
            : `${classes.centerAlignWrapper} ${classes.noItem}`
        }`}
      >
        {list}
      </div>
    </div>
  );
};

export default MyReceipts;
