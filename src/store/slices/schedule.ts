import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  schaduleStates: {
    startDate: moment().subtract(1, "year").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  },
};

const schaduleSlice = createSlice({
  name: "schadule",
  initialState,
  reducers: {
    // schadule states
    setSchaduleDates: (state, { payload }) => {
      state.schaduleStates.startDate = moment(payload.startDate).format(
        "YYYY-MM-DD"
      );
      state.schaduleStates.endDate = moment(payload.endDate).format(
        "YYYY-MM-DD"
      );
    },

  },
});

export const { setSchaduleDates } = schaduleSlice.actions;

export default schaduleSlice;
