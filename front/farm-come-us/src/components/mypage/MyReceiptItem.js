import { useNavigate } from "react-router-dom";
import classes from "./style/MyReceiptItem.module.scss";

const MyReceiptItem = (props) => {
  const navigate = useNavigate();
  let item = {
    id: "1084165156",
    items: ["강원도 고랭지 배추", "제주 스윗 당근", "충주 호박고구마"],
    cost: 429000,
    ordertime: "2023.01.10 21:12:58",
  };

  const receiptDetailHandler = () => {
    navigate(`/receipt/${props.id}`, {
      state: {
        orderId: props.orderId,
        orderDate: props.orderDate,
        orderLength: item.items.length,
      },
    });
  };
  // item1 = { id:orderId, items:[강원도배추, 제즈스윗당근],
  //         cost:429,000, orderdate:2023.01.10 21:12:58, }
  //   수정필요. 돈 받아서 , 찍고 출력해야됨. 해당 컴포넌트에서 유효성검사로 바꿔줄 필요 있음.

  return (
    <div
      className={`${classes.card} ${classes.mt}`}
      onClick={receiptDetailHandler}
    >
      <div className={`${classes.orderId}`}>{`주문번호 : ${item.id}`}</div>
      <div className={`${classes.rowflexbox} ${classes.mt}`}>
        <div
          className={`${classes.orderDescription} ${classes.widthFull} `}
        >{`구매상품(${item.items.length}): `}</div>
        <div className={classes.orderDescription}>{` ${item.items}`}</div>
      </div>
      <div className={`${classes.rowedgeflexbox} ${classes.mt}`}>
        <div className={classes.ordertime}>{`구매일: ${item.ordertime}`}</div>
        <div className={classes.cost}>{`${item.cost}원`}</div>
      </div>
    </div>
  );
};

export default MyReceiptItem;
