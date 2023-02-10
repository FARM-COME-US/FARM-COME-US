import axios from "axios";

const DUMMY_SERVER_URL = "http://localhost:9090";
const USER_API_URL = `${DUMMY_SERVER_URL}/member`;

export async function userSignUp(userInfo) {
  const data = {
    id: userInfo.id,
    email: userInfo.email,
    nickname: userInfo.nickname,
    name: userInfo.name,
    phoneNumber: userInfo.phoneNumber,
    password: userInfo.password,
    streetAddr: userInfo.streetAddr,
    detailAddr: userInfo.detailAddr,
    zipcode: userInfo.zipcode,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: false,
  };

  try {
    const response = axios.post("api/api/v1/member/join", data, config);

    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

export async function login(id, password) {
  console.log("login", id, password);
  try {
    const response = axios.post("api/api/v1/member/login", {
      id: id,
      password: password,
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

export async function fetchUserInfo(id) {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);
  const memberId = id;

  try {
    const response = axios.get(`/api/member`, {
      params: { memberId: memberId },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        token: `${accessToken}`,
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}
