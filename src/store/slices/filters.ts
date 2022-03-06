import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: {
    direction: null,
    teacher: null,
    days: null,
    room: null,
    lessonsStartDate: null,
    lessonsEndDate: null,
  },
  students: {
    pupils__group__course__direction: null,
    pupils__group__teacher: null,
    pupils__group: null,
    gender: null,
    district: null,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setGroupFilterDirection: (state, { payload }) => {
      state.groups.direction = payload;
    },
    setGroupFilterTeacher: (state, { payload }) => {
      state.groups.teacher = payload;
    },
    setGroupFilterDays: (state, { payload }) => {
      state.groups.days = payload;
    },
    setGroupFilterRoom: (state, { payload }) => {
      state.groups.room = payload;
    },
    setGroupFilterLessonStartDate: (state, { payload }) => {
      state.groups.lessonsStartDate = payload;
    },
    setGroupFilterLessonEndDate: (state, { payload }) => {
      state.groups.lessonsEndDate = payload;
    },

    setStudentFilterDirection: (state, { payload }) => {
      state.students.pupils__group__course__direction = payload;
    },
    setStudentFilterTeacher: (state, { payload }) => {
      state.students.pupils__group__teacher = payload;
    },
    setStudentFilterGroup: (state, { payload }) => {
      state.students.pupils__group = payload;
    },
    setStudentFilterGender: (state, { payload }) => {
      state.students.gender = payload;
    },
    setStudentFilterDistrict: (state, { payload }) => {
      state.students.district = payload;
    },
  },
});

export const {
  setGroupFilterDays,
  setGroupFilterDirection,
  setGroupFilterLessonEndDate,
  setGroupFilterLessonStartDate,
  setGroupFilterRoom,
  setGroupFilterTeacher,
  
  setStudentFilterDirection,
  setStudentFilterDistrict,
  setStudentFilterGender,
  setStudentFilterGroup,
  setStudentFilterTeacher,
} = filtersSlice.actions;

export default filtersSlice;
