import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  itemData: null ,
};

const getItemSlices = createSlice({
  name: "id",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.itemData = action.payload;
    },
  },
});

export const { setItem } = getItemSlices.actions;

export default getItemSlices;
