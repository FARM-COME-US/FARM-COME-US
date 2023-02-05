import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:3000";
const STORE_API_URL = `${DUMMY_SERVER_URL}/store`;
const STORE_LIKE_API_URL = `${DUMMY_SERVER_URL}/storelikes`;

const clientStoreObjFormatter = (obj) => {
  return {
    productId: obj.storeId,
    productName: obj.storeName,
    desc: obj.storeDescription,
    imgSrc: obj.storeImg,
    price: obj.storeStreetAddr,
    discount: obj.storeDetailAddr,
    stock: obj.storeZipcode,
    regDate: obj.storePhoneNumber,
    category: obj.storeDeliveryCost,
    storeId: obj.storeDeliveryFree,
  };
};

const serverStoreObjFormatter = (obj) => {
  return {
    storeId: obj.storeId,
    storeName: obj.storeName,
    storeDescription: obj.desc,
    storeImg: obj.imgSrc,
    storeStreetAddr: obj.addr,
    storeDetailAddr: obj.addrDetail,
    storeZipcode: obj.zipCode,
    storePhoneNumber: obj.pno,
    storeDeliveryCost: obj.deliveryCost,
    storeDeliveryFree: obj.deliveryFree,
  };
};

/* 스토어 생성 */
export async function createStore(store) {
  try {
    const response = axios({
      method: "post",
      url: STORE_API_URL,
      data: {
        request: serverStoreObjFormatter(store),
      },
    });
    console.log(response.success);
  } catch (err) {
    console.err(err);
  }
}

/* 스토어 상세 조회 */
export async function storeDetail(storeId) {
  try {
    const response = axios({
      method: "get",
      url: STORE_API_URL,
      params: {
        storeId: storeId,
      },
    });
    const data = response.json();
    console.log(data);
  } catch (err) {
    console.err(err);
  }
}

/* 스토어 정보 수정 */
export async function updateStore(store) {
  try {
    const response = axios({
      method: "put",
      url: STORE_API_URL,
      params: {
        sotreId: store.storeId,
      },
      data: {
        request: store,
      },
    });
    console.log(response.success);
  } catch (err) {
    console.err(err);
  }
}

/* 스토어 삭제 */
// 해당 스토어의 주인만 삭제할 수 있는 로직 필요 (서버 단에서 처리??)
export async function delteStore(storeId) {
  try {
    const response = axios({
      method: "delete",
      url: STORE_API_URL,
      params: {
        storeId: storeId,
      },
    });
    console.log(response.success);
  } catch (err) {
    console.err(err);
  }
}

/* 스토어 찜 */
export async function addFavStore(userId, storeId) {
  try {
    const response = axios({
      method: "post",
      url: STORE_LIKE_API_URL,
      data: {
        id: null,
        memberId: userId,
        storeId: storeId,
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

/* 스토어 찜 취소 */
export async function deleteFavStore(userId, storeId) {
  try {
    const response = axios({
      method: "delete",
      url: STORE_LIKE_API_URL,
      params: {
        storeId: storeId,
      },
      data: {
        id: null,
        memberId: userId,
        storeId: storeId,
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}
