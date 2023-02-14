import { useState, useEffect } from "react";
import MyReceiptItem from "../../components/mypage/MyReceiptItem";
import classes from "./style/MyReceipts.module.scss";
import { orderList } from "../../utils/api/order-http";
import axios from "axios";
import { useSelector } from "react-redux";

const res = orderList();
console.log(res);

const MyReceipts = (props) => {
  const [myReceiptsInfoArr, setReceiptsInfoArr] = useState("");
  // receiptsInfoArr가 list형태의 객체들로 들어올것이고, [obj1, obj2... 이렇게.]
  // item1 = { id:orderId, items:[강원도배추, 제즈스윗당근], cost:429,000, orderdate:2023.01.10 21:12:58, }
  const memberId = useSelector((state) => state.userSlice.value.memberId);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_SERVER_URL + "/api/v1/order/" + memberId)
      .then((res) => {
        setReceiptsInfoArr(res.data);
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
          myReceiptsInfoArr
            ? ""
            : `${classes.centerAlignWrapper} ${classes.noItem}`
        }`}
      >
        {/* <MyReceiptItem /> */}
        {/* <MyReceiptItem /> */}
        {/* <MyReceiptItem />; */}
        {list}
        {/* <div className={classes.flexbox}></div> */}
      </div>
    </div>
  );
};

export default MyReceipts;
