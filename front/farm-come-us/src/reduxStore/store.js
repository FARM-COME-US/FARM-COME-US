import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    menu: menuSlice.reducer,
  },
});

export default store;
