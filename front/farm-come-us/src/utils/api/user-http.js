import axios from "axios";

const DUMMY_SERVER_URL = "http://localhost:9090";
const USER_API_URL = `${DUMMY_SERVER_URL}/member`;

const clientOrderObjFormatter = (obj) => {
  return {};
};

const serverOrderObjFormatter = (obj) => {
  return {
    id: obj.userId,
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
  console.log(userInfo);
  let data = serverOrderObjFormatter(userInfo);
  data = {
    ...data,
    id: data.userId,
  };
  data["id"] = userInfo.userId;
  console.log(data);
  try {
    const response = axios.post("api/member/join", {
      data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    });

    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

export async function login(id, password) {
  try {
    const response = axios.post(`${USER_API_URL}/login`, {
      id: id,
      password: password,
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}
