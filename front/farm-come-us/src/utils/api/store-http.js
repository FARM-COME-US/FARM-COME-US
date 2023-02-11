import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:3000";
const STORE_API_URL = `${DUMMY_SERVER_URL}/store`;
const STORE_LIKE_API_URL = `${DUMMY_SERVER_URL}/storelikes`;

/* 스토어 생성 */
export async function fetchCreateStore(storeInfo, userInfo) {
  const DUMMY_USER_INFO = {
    memberId: 1,
    id: 1,
    username: "myFarm",
  };

  const data = {
    memberId: userInfo.memberId,
    storeDeliveryCost: storeInfo.deliveryCost,
    storeDeliveryFree: storeInfo.deliveryFree,
    storeDescription: storeInfo.desc,
    storeDetailAddr: storeInfo.detailAddr,
    storeImg: storeInfo.imgSrc,
    storeName: storeInfo.storeName,
    storePhoneNumber: storeInfo.phoneNumber,
    storeStreetAddr: storeInfo.streetAddr,
    storeZipcode: storeInfo.zipcode,
    uploadFile: storeInfo.uploadFile,
    // 😀 수정필요. 테스트 중.
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: { token: sessionStorage.getItem("accessToken") },
      token: sessionStorage.getItem("accessToken"),
    },
    withCredentials: false,
  };
  console.log("유저정보");
  console.log(userInfo.memberId);
  console.log(data);
  try {
    const response = axios.post("/api/api/v1/store", data, config);
    // console.log(`토큰 이렇게 잘 온다고: ${config.headers.token}`);
    console.log("1");
    console.log(response);
    console.log("2");
  } catch (err) {
    console.err(err);
    console.log("3");
  }
}

/* 스토어 상세 조회 */
export async function fetchStoreDetail(storeId) {
  try {
    const response = axios.get("/api/store", {
      params: {
        storeId,
      },
    });

    console.log(response);
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
