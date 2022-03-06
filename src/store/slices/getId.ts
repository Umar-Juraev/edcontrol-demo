import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  clientId: null,
};

const getIdSlices = createSlice({
  name: "id",
  initialState,
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
  },
});

export const { setClientId } = getIdSlices.actions;

export default getIdSlices;
