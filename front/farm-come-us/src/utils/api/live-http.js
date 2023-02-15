import axios from "axios";

const LIVE_API_URL = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/live`;

/* 라이브 등록 */
export async function fetchAddLive(liveInfo) {
  const data = { ...liveInfo };
  return axios.post(`${LIVE_API_URL}`, data);
}

/* 진행 중인 라이브 목록 조회 */
export async function fetchRunningLiveList() {
  const params = {
    liveTitle: "",
    page: 0,
    size: 10,
  };
  try {
    const response = await axios.get(`${LIVE_API_URL}/list/on`, params);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

/* 예약된 라이브 목록 조회 */
export async function fetchScheduledLiveList() {
  const params = {
    liveTitle: "",
    page: 0,
    size: 10,
  };
  try {
    const response = await axios.get(`${LIVE_API_URL}/list/off`, params);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

/* 라이브 상세 조회 */
export async function getLiveDetail(id) {
  try {
  } catch (err) {
    console.error(err);
  }

  return null;
}

/* 라이브 수정 */
export async function updateLive(liveInfo) {
  try {
  } catch (err) {
    console.error(err);
  }
}

/* 라이브 삭제 */
export async function deleteLive(id) {
  try {
  } catch (err) {
    console.error(err);
  }
}
