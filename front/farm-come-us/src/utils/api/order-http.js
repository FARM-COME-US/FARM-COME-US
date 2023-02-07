import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:3000";
const ORDER_API_URL = `${DUMMY_SERVER_URL}/order`;

const clientOrderObjFormatter = (obj) => {
  return {
    orderId: obj.id,
    productId: obj.item_id,
    count: obj.orderCount,
  };
};

const serverOrderObjFormatter = (obj) => {
  return {
    id: obj.orderId,
    item_id: obj.productId,
    orderCount: obj.count,
  };
};

/* 단건 주문 */
export async function orderProduct(order) {
  try {
    const response = axios({
      method: "post",
      url: ORDER_API_URL,
      data: {
        orderDto: serverOrderObjFormatter(order),
      },
    });
    console.log(response);
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
