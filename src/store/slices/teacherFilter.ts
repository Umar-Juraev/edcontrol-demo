import { createSlice } from "@reduxjs/toolkit";
// import moment from "moment";

const initialState = {
  teachers: {
    direction: null,
    gender: null,
    district: null,
  },
};

const teacherFilterSlice = createSlice({
  name: "teachersFilter",
  initialState,
  reducers: {
    setTeacherFilterDirection: (state, { payload }) => {
      state.teachers.direction = payload;
    },
    setTeacherFilterGender: (state, { payload }) => {
      state.teachers.gender = payload;
    },

    setTeacherFilterDistrict: (state, { payload }) => {
      state.teachers.district = payload;
    },
  },
});

export const {
  setTeacherFilterDirection,
  setTeacherFilterGender,
  setTeacherFilterDistrict,
} = teacherFilterSlice.actions;

export default teacherFilterSlice;
