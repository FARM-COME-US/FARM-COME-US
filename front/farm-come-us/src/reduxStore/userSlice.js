import { createSlice } from "@reduxjs/toolkit";
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
}; //정확히 어떤 변수명으로 가지고 있어야할지 정하지 못함. BE와 문의

const userSlice = createSlice({
  name: "user",
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
  extraReducers: {},
});

export default userSlice;
