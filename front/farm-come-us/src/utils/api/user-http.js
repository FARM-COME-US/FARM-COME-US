import axios from "axios";
import session from "redux-persist/lib/storage/session";

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
    const response = axios.post(
      process.env.REACT_APP_API_SERVER_URL + "/api/v1/member/join",
      data,
      config
    );
    sessionStorage.setItem("accessToken", response.data);
  } catch (err) {
    console.err(err);
  }
}

export async function login(id, password) {
  try {
    const response = axios.post(
      process.env.REACT_APP_API_SERVER_URL + "api/v1/member/login",
      {
        id: id,
        password: password,
      }
    );

    const accessToken = response.data["token"];
    sessionStorage.setItem("accessToken", accessToken);
  } catch (err) {
    console.err(err);
  }
}

export async function fetchUserInfoWithAccessToken() {
  const accessToken = sessionStorage.getItem("accessToken");

  try {
    const userDataRes = axios.get("/api/api/v1/member/", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        token: accessToken,
      },
    });

    // dispatch(userSlice.actions.login(userDataRes.data.userInfo));
    return userDataRes;
  } catch (err) {
    console.err(err);
  }
}

export async function fetchUserInfo(id) {
  const accessToken = sessionStorage.getItem("accessToken");
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

export async function fetchUpdateUserInfo(userInfo) {
  const formData = new FormData();
  formData.append("uploadFile", userInfo.uploadFile);

  const data = {
    nickname: userInfo.nickname,
    name: userInfo.name,
    email: userInfo.email,
    phoneNumber: userInfo.phoneNumber,
    streetAddr: userInfo.streetAddr,
    zipcode: userInfo.zipcode,
    detailAddr: userInfo.detailAddr,
  };
  formData.append(
    "memberUpdateReq",
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

  return axios.put(
    `${process.env.REACT_APP_API_SERVER_URL}/api/v1/member`,
    formData,
    config
  );
}
