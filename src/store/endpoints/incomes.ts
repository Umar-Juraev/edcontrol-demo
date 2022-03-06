import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IncomesDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: IncomesDTO[];
};

export const incomesApi = createApi({
  reducerPath: `incomes`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Incomes', 'IncomeById'],

  endpoints: (builder) => ({
    // Queries
    incomes: builder.query<GetDataType, { user?: number, pupil__user?: number, page?: number } | void>({
      query: (queries) => {
        return {
          url: `/incomes/`,
          params: { ...queries }
        }
      },
      providesTags: ['Incomes']
    }),

    incomeById: builder.query<IncomesDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/incomes/ ${id}/`
        }
      },
      providesTags: ['IncomeById']
    })
  }),
});

export const {
  useIncomesQuery,
  useIncomeByIdQuery
} = incomesApi;
