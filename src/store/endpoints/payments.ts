import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentsDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: PaymentsDTO[];
};

export const paymentsApi = createApi({
  reducerPath: `payments`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Payments', 'PaymentById'],

  endpoints: (builder) => ({
    // Queries
    payments: builder.query<GetDataType, {
      user?: number,
      page?: number,
      provider?: number | null,
      by_direction?: number | null,
      by_user_gender?: Array<string> | null
    } | void>({
      query: (queries) => {
        return {
          url: `/payments/`,
          params: { ...queries }
        }
      },
      providesTags: ['Payments'],
    }),

    paymentById: builder.query<PaymentsDTO, { id?: string | number }>({
      query: ({ id }) => {
        return {
          url: `payments/ ${id}/`
        }
      },
      providesTags: ['PaymentById'],
    }),

    // Mutations
    createPayment: builder.mutation<PaymentsDTO, Partial<PaymentsDTO>>({
      query(data) {
        return {
          url: `/payments/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['Payments']
    }),

    updatePayment: builder.mutation<PaymentsDTO, Partial<PaymentsDTO>>({
      query(data) {
        return {
          url: `/payments/${data.id}/`,
          method: `PATCH`,
          body: data,
        };
      },
      invalidatesTags: ['Payments', 'PaymentById']
    }),

    deletePayment: builder.mutation<PaymentsDTO, { id?: string | number }>({
      query({ id }) {
        return {
          url: `/payments/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Payments', 'PaymentById']
    }),

  }),
});

export const {
  usePaymentsQuery,
  usePaymentByIdQuery,
  useCreatePaymentMutation,
  useDeletePaymentMutation,
  useUpdatePaymentMutation,
} = paymentsApi;
