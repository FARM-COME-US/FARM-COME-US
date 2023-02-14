import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:3000";
// const ORDER_API_URL = `${DUMMY_SERVER_URL}/api/v1/order`;
const ORDER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/order`;

const clientOrderObjFormatter = (obj) => {
  return {
    orderId: obj.id,
    productId: obj.item_id,
    count: obj.orderCount,
  };
};

// const serverOrderObjFormatter = () => {
//   return {
//     memberId: 3,
//     itemId: 1,
//     oitemCount: 10,
//   };
// };

/* 단건 주문 */
export async function orderProduct() {
  try {
    const response = axios({
      method: "post",
      url: "api/api/v1/order",
      data: {
          itemId: 1,
          memberId: 3,
          oitemCount: 2,
          orderInfoDtoList: [
            null
          ]
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

// 주문 조회
 export async function orderList() {
  try {
    const response = axios({
        method: "get",
        url:  ORDER_API_URL,
        params: {member : 2}
    });
    console.log((await response).data.orderList);
  } catch (err) {
    console.err(err);
  }
}

/* 주문 취소 */
export async function updateOrder(orderId) {
  try {
    const response = axios({
      method: "put",
      url: ORDER_API_URL,
      params: {
        orderId: orderId,
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}
