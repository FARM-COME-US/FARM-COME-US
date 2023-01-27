import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isOpen: initialStateValue.isOpen,
  },
  reducers: {
    open: (state, action) => {
      state.status = action.payload.isOpen;
    },
    close: (state, action) => {
      state.status = action.payload.isOpen;
    },
  },
});

export default menuSlice;
