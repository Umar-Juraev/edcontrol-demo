import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const initialState = {
  date: moment().toString(),
  movedDate: moment().toString(),
  defaultDate: moment().toString(),
  cancelDate: null,
  id: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendanceDate: (state, action) => {
      state.date = action.payload;
    },
    setAttendanceMovedDate: (state, action) => {
      state.movedDate = action.payload;
    },
    setAttendanceCancelDate: (state, action) => {
      state.cancelDate = action.payload;
    },
    setAttendanceDefaultDate: (state, action) => {
      state.defaultDate = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {
  setAttendanceDate,
  setAttendanceMovedDate,
  setAttendanceCancelDate,
  setAttendanceDefaultDate,
  setId
} = attendanceSlice.actions;

export default attendanceSlice;
