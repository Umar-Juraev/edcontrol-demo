import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import currentUserSlice from "./slices/user";
import attendanceSlice from "./slices/attendance";
import filtersSlice from "./slices/filters";
import financesSlice from "./slices/finances";
import getIdSlices from "./slices/getId";
import clientFilterSlice from "./slices/clientFilters";
import schaduleSlice from "./slices/schedule";
import { materialsApi } from "./endpoints/materials";
import teachersFilterSlice from "./slices/teacherFilter";

import {
  authApi,
  groupsApi,
  coursesApi,
  studentsApi,
  teachersApi,
  paymentsApi,
  roomApi,
  branchApi,
  classifiersApi,
  pupilsApi,
  employeesApi,
  incomesApi,
  extraPhoneNumbersApi,
  outcomesApi,
  statisticsApi,
  lessonsApi,
  clientsApi,
  photosApi,
  postsApi,
  scheduleApi,
  globalSearchApi,
} from "./endpoints";

const reducers = combineReducers({
  currentUser: currentUserSlice.reducer,
});

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    [groupsApi.reducerPath]: groupsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [pupilsApi.reducerPath]: pupilsApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [incomesApi.reducerPath]: incomesApi.reducer,
    [outcomesApi.reducerPath]: outcomesApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [classifiersApi.reducerPath]: classifiersApi.reducer,
    [extraPhoneNumbersApi.reducerPath]: extraPhoneNumbersApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [materialsApi.reducerPath]: materialsApi.reducer,
    [globalSearchApi.reducerPath]: globalSearchApi.reducer,
    persistedData: persistedReducer,
    attendance: attendanceSlice.reducer,
    filters: filtersSlice.reducer,
    finances: financesSlice.reducer,
    idSlicesRoot: getIdSlices.reducer,
    clientFilter: clientFilterSlice.reducer,
    teacherFilter: teachersFilterSlice.reducer,
    schadule: schaduleSlice.reducer,
  },
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(groupsApi.middleware)
      .concat(coursesApi.middleware)
      .concat(authApi.middleware)
      .concat(studentsApi.middleware)
      .concat(pupilsApi.middleware)
      .concat(teachersApi.middleware)
      .concat(employeesApi.middleware)
      .concat(paymentsApi.middleware)
      .concat(roomApi.middleware)
      .concat(branchApi.middleware)
      .concat(incomesApi.middleware)
      .concat(outcomesApi.middleware)
      .concat(statisticsApi.middleware)
      .concat(classifiersApi.middleware)
      .concat(extraPhoneNumbersApi.middleware)
      .concat(clientsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
