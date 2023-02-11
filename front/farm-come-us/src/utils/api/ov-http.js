import axios from "axios";

const OV_API_URL = "/api/openvidu/api";

export async function fetchLiveSessions() {
  setTimeout(() => {}, 10000);
  try {
    // const response = axios.get(`${OV_API_URL}/sessions`);
    const { data } = await axios.get(`/api/api/sessions`);
    return data.content;
  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function fetchLiveSession(sessionId) {
  try {
    const { data } = await axios.get(`/api/api/sessions/${sessionId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
  return null;
}
