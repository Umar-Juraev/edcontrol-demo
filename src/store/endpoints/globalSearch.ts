import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GlobalSearchDTO } from "types";

export const globalSearchApi = createApi({
  reducerPath: `globalSearch`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Global"],

  endpoints: (builder) => ({
    // Queries
    globalSearch: builder.query<
      GlobalSearchDTO,
      {
        search?: string;
      } | void
    >({
      query: (queries) => ({
        url: "/global-search/",
        params: { ...queries },
      }),
      providesTags: ["Global"],
    }),
  }),
});

export const { useGlobalSearchQuery } = globalSearchApi;
