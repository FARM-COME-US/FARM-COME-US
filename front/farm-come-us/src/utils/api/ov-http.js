import axios from "axios";

const OV_API_URL = "/api/openvidu/api";

export async function fetchLiveSessions() {
  try {
    // const response = axios.get(`${OV_API_URL}/sessions`);
    const response = await axios.get(`/api/api/sessions`);
    const liveSessions = response.data.content;
    console.log(liveSessions);

    const res = await axios.get(`/api/api/sessions/${1}`);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}
