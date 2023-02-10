import axios from "axios";

const LIVE_API_URL = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/live`;

/* 라이브 등록 */
export async function addLive(data) {
  try {
  } catch (err) {
    console.error(err);
  }

  return null;
}

/* 라이브 목록 조회 */
export async function fetchLiveList() {
  try {
    await axios.get(`${LIVE_API_URL}/list`);
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
