import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  paymentStates: {
    openFilterModal: false,
    provider: null,
    direction: null,
    gender: ''
  },
  costsStates: {
    openFilterModal: false,
    startDate: null,
    endDate: null,
    reason: null,
    employee: null
  },
  salaryStates: {
    openNewTeacherModal: false,
    openCalculator: false,
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  }
};

const financesSlice = createSlice({
  name: "finances",
  initialState,
  reducers: {
    // payment states
    setOpenPaymentFilterModal: (state, { payload }) => {
      state.paymentStates.openFilterModal = payload;
    },
    setPaymentFilterProvider: (state, { payload }) => {
      state.paymentStates.provider = payload;
    },
    setPaymentFilterDirection: (state, { payload }) => {
      state.paymentStates.direction = payload;
    },
    setPaymentFilterGender: (state, { payload }) => {
      state.paymentStates.gender = payload;
    },

    // costs states
    setOpenCostsFilterModal: (state, { payload }) => {
      state.costsStates.openFilterModal = payload;
    },
    setCostsFilterStartDate: (state, { payload }) => {
      state.costsStates.startDate = payload;
    },
    setCostsFilterEndDate: (state, { payload }) => {
      state.costsStates.endDate = payload;
    },
    setCostsFilterReason: (state, { payload }) => {
      state.costsStates.reason = payload;
    },
    setConstsFilterEmployee: (state, { payload }) => {
      state.costsStates.employee = payload;
    },

    // salary states
    setOpenNewTeacherModal: (state, { payload }) => {
      state.salaryStates.openNewTeacherModal = payload;
    },
    setOpenCalculator: (state, { payload }) => {
      state.salaryStates.openCalculator = payload;
    },
    setSalaryDates: (state, { payload }) => {
      state.salaryStates.startDate = moment(payload.startDate).format('YYYY-MM-DD');
      state.salaryStates.endDate = moment(payload.endDate).format('YYYY-MM-DD');
    },
  }
});

export const {
  setOpenPaymentFilterModal,
  setPaymentFilterProvider,
  setPaymentFilterDirection,
  setPaymentFilterGender,

  setOpenCostsFilterModal,
  setCostsFilterStartDate,
  setCostsFilterEndDate,
  setCostsFilterReason,
  setConstsFilterEmployee,

  setOpenNewTeacherModal,
  setOpenCalculator,
  setSalaryDates
} = financesSlice.actions;

export default financesSlice;
