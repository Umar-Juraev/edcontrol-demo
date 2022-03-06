
import { createSlice } from "@reduxjs/toolkit";
// import moment from "moment";

const initialState = {
  clients: {
    direction: null,
    source: null,
    date_add_start: null,
    date_add_end: null,
    status: null
  },
//   salaryStates: {
//     openNewTeacherModal: false,
//     openCalculator: false,
//     startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
//     endDate: moment().format('YYYY-MM-DD')
//   }
};

const clientFilterSlice = createSlice({
  name: "clientFilter",
  initialState,
  reducers: {
    setClientFilterDirection: (state, { payload }) => {
      state.clients.direction = payload;
    },
    setClientFilterSource: (state, { payload }) => {
      state.clients.source = payload;
    },
    setClientFilterDateAddStart: (state, { payload }) => {
      state.clients.date_add_start = payload;
    },
    setClientFilterDateAddEnd: (state, { payload }) => {
      state.clients.date_add_end = payload;
    },
    setClientFilterStatus: (state, { payload }) => {
      state.clients.status = payload;
    },

    // salary states
    // setOpenNewTeacherModal: (state, { payload }) => {
    //   state.salaryStates.openNewTeacherModal = payload;
    // },
    // setOpenCalculator: (state, { payload }) => {
    //   state.salaryStates.openCalculator = payload;
    // },
    // setSalaryDates: (state, { payload }) => {
    //   state.salaryStates.startDate = moment(payload.startDate).format('YYYY-MM-DD');
    //   state.salaryStates.endDate = moment(payload.endDate).format('YYYY-MM-DD');
    // },
  }
});

export const {
    setClientFilterDirection,
    setClientFilterSource,
    setClientFilterDateAddStart,
    setClientFilterDateAddEnd,
    setClientFilterStatus,

//   setOpenNewTeacherModal,
//   setOpenCalculator,
//   setSalaryDates
} = clientFilterSlice.actions;

export default clientFilterSlice;
