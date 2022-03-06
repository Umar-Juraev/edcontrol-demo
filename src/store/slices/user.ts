import { createSlice } from "@reduxjs/toolkit";
import { UsersDTO } from "types";

const initialState: { data: UsersDTO | null; expireTime: string | null } = {
  data: null,
  expireTime: null,
};

const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
    },
    setExpireTime: (state, action) => {
      state.expireTime = action.payload;
    },
  },
});

export const { setCurrentUser, setExpireTime } = currentUserSlice.actions;

export default currentUserSlice;
