import { useState } from "react";
import MyReceiptItem from "../../components/mypage/MyReceiptItem";
import classes from "./style/MyReceipts.module.scss";

const MyReceipts = (props) => {
  const [myReceiptsInfoArr, setReceiptsInfoArr] = useState("1");
  // receiptsInfoArr가 list형태의 객체들로 들어올것이고, [obj1, obj2... 이렇게.]
  // item1 = { id:orderId, items:[강원도배추, 제즈스윗당근], cost:429,000, orderdate:2023.01.10 21:12:58, }

  const fetchReceipts = () => {
    const asyncSomethingFetch = async () => {
      // const res = await axios 요청을 통해 받아오는 자리
      // cosnt abc = res.data.abc
      // setReceiptsInfoArr(abc)
    };
  };

  let list = <span className={classes.noItem}>구매 내역이 없습니다.</span>;

  // if (myReceiptsInfoArr.length > 0) {
  //   list = props.myReceipts.map((item) => (
  //     <MyReceiptItem key={item.id} info={item} />
  //   ));
  // }

  // list = <MyReceiptItem />;

  return (
    <div>
      <div className={classes.header}>구매내역</div>

      <div
        className={`${classes.flexbox} ${classes.mt} ${
          myReceiptsInfoArr ? "" : classes.centerAlignWrapper
        }`}
      >
        <MyReceiptItem />
        <MyReceiptItem />
        <MyReceiptItem />;{/* {list} 원상복구 필요. 수정필요*/}
      </div>
    </div>
  );
};

export default MyReceipts;
