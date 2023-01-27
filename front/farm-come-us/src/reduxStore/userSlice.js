import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// createAsyncThunk
// import axios from "axios";

// const myServerURL = 'myserverURL'
// const asyncCodePost = createAsyncThunk(
//     'userSlice/asyncCodePost',
//     async () => {
//         const res = await axios.post(myServerURL, {
//             code:
//         })
//     }
// )
const initialStateValue = {
  accessToken: "",
  refreshToken: "",
  accessCode: "",
  email: "",
  id: "",
  nickname: "",
  isLogin: false,
}; //정확히 어떤 변수명으로 가지고 있어야할지 정하지 못함. BE와 문의

const asyncSomethingFetch = createAsyncThunk(
  "userSlice/something",
  async () => {
    const res = await axios.get("myServerURL");
    const data = await res.json();
    return data.value;
    // value가 주어지는거에 따라서 pending, fulfilled, rejected가 달라짐.
    // 로그인을 처리하는 비동기함수라고 생각하고 있음.
  }
);
// 비동기 처리하는 함수. 이름 안정함.

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialStateValue;
    },
    // up: (state, action) => {
    //   state.value = state.value + action.payload;
    // }, 참고용 예시 코드
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSomethingFetch.pending, (state, action) => {
      state.status = "loading";
    });
    // 요청 보내서 아직 못받은 상태
    builder.addCase(asyncSomethingFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "complete";
    });
    // 요청 보내서 받은 상태. value도 업데이트해줌.
    builder.addCase(asyncSomethingFetch.rejected, (state, action) => {
      state.status = "fail";
    });
    // 요청 보내서 거절 상태. fail상태만 보여줌.
  },
});

export { asyncSomethingFetch };
export default userSlice;
