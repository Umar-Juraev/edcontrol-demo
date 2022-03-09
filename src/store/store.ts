import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import currentUserSlice from "./slices/user";
import attendanceSlice from "./slices/attendance";
import filtersSlice from "./slices/filters";
import financesSlice from "./slices/finances";
import getItemSlices from "./slices/getItem";
import clientFilterSlice from "./slices/clientFilters";
import schaduleSlice from "./slices/schedule";
import teachersFilterSlice from "./slices/teacherFilter";

import { groupsApi } from "./endpoints";

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
    persistedData: persistedReducer,
    attendance: attendanceSlice.reducer,
    filters: filtersSlice.reducer,
    finances: financesSlice.reducer,
    itemSlicesRoot: getItemSlices.reducer,
    clientFilter: clientFilterSlice.reducer,
    teacherFilter: teachersFilterSlice.reducer,
    schadule: schaduleSlice.reducer,
  },
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(groupsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
