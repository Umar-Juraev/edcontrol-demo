import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ScheduleDTO } from "types";

export const scheduleApi = createApi({
  reducerPath: "schedule",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Schedules"],
  endpoints: (builder) => ({
    //Queries
    schedules: builder.query<ScheduleDTO[], { branch?: number; date_from: string; date_to: string; } | void>({
      query: (queries) => {
        return {
          url: `/schedule/`,
          params: { ...queries },
        };
      },
      providesTags: ["Schedules"],
    }),
  }),
});

export const { useSchedulesQuery } = scheduleApi;
