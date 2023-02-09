import axios from "axios";
import { zip } from "lodash";

const DUMMY_SERVER_URL = "http://localhost:9090";
const USER_API_URL = `${DUMMY_SERVER_URL}/member`;

const clientOrderObjFormatter = (obj) => {
  return {};
};

const serverOrderObjFormatter = (obj) => {
  return {
    id: obj.id,
    password: obj.password,
    nickname: obj.nickname,
    name: obj.name,
    email: obj.email,
    streetAddr: obj.streetAddr,
    detailAddr: obj.detailAddr,
    zipcode: obj.zipcode,
    phoneNumber: obj.pno,
  };
};

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
    const response = axios.post("api/member/join", data, config);

    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

export async function login(id, password) {
  try {
    const response = axios.post(`api/member/login`, {
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

  try {
    const response = axios.get(`/api/member/`, {
      params: { memberId: id },
      headers: {
        token: accessToken,
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}
