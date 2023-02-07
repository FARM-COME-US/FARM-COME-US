import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:9090";
const USER_API_URL = `${DUMMY_SERVER_URL}`;

const clientOrderObjFormatter = (obj) => {
  return {};
};

const serverOrderObjFormatter = (obj) => {
  return {
    id: obj.userId,
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
  try {
    const response = axios({
      method: "post",
      url: `${USER_API_URL}/join`,
      data: {
        request: serverOrderObjFormatter(userInfo),
      },
    });
    console.log(response);
  } catch (err) {
    console.err(err);
  }
}
