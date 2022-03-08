import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

const auth = createSlice({
  name: "schadule",
  initialState,
  reducers: {
    // schadule states
    setLogin: (state, { payload }) => {
    
    },

  },
});

export const { setLogin } = auth.actions;

export default auth;
