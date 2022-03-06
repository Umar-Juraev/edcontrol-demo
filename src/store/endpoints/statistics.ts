import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IncomeStatisticsDTO, MainPageStatisticsDTO, PaymentStatisticsDTO } from "types";

export const statisticsApi = createApi({
  reducerPath: `statistics`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['IncomeStatistics', 'PaymentStatistics', 'MainPageStatistics'],

  endpoints: (builder) => ({
    // Queries
    incomeStatistics: builder.query<IncomeStatisticsDTO, void>({
      query: () => ({
        url: "/income-statistics/"
      }),
      providesTags: ['IncomeStatistics']
    }),

    paymentStatistics: builder.query<PaymentStatisticsDTO, void>({
      query: () => ({
        url: "/payment-statistics/"
      }),
      providesTags: ['PaymentStatistics']
    }),

    mainPageStatistics: builder.query<MainPageStatisticsDTO, void>({
      query: () => ({
        url: "/main-page-statistics/"
      }),
      providesTags: ['MainPageStatistics']
    }),

  })
});

export const {
  useIncomeStatisticsQuery,
  usePaymentStatisticsQuery,
  useMainPageStatisticsQuery
} = statisticsApi