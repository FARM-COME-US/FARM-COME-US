import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:3000";
const STORE_API_URL = `${DUMMY_SERVER_URL}/store`;
const STORE_LIKE_API_URL = `${DUMMY_SERVER_URL}/storelikes`;

/* 스토어 생성 */
export async function fetchCreateStore(storeInfo, userInfo) {
  // const DUMMY_USER_INFO = {
  //   memberId: 1,
  //   id: 1,
  //   username: "myFarm",
  // };
  const formData = new FormData();
  formData.append("uploadFile", storeInfo.uploadFile);

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
    // uploadFile: storeInfo.uploadFile,
    // 😀 수정필요. 테스트 중.
  };

  formData.append(
    "store",
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    })
  );

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
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
    const response = axios.post("/api/api/v1/store", formData, config);
    console.log(formData);
    console.log(response);
    return response;
  } catch (err) {
    console.err(err);
  }
}

/* 스토어 상세 조회 */
export async function fetchStoreDetail(storeId) {
  try {
    const response = axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/api/v1/store/${storeId}`,
      {
        // params: {
        //   storeId,
        // },
      }
    );

    console.log(response);
    return response;
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

/* 유저의 스토어 찜 정보 받아오기 */
export async function fetchFavStores(memberId) {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/api/v1/storelikes/${memberId}`
    );

    console.log(res);
  } catch (err) {
    console.log(err);
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
export async function deleteFavStore(id, userId, storeId) {
  try {
    const response = axios({
      method: "delete",
      url: STORE_LIKE_API_URL,
      params: {
        storeId: storeId,
      },
      data: {
        id: id,
        memberId: userId,
        storeId: storeId,
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}
