import { ExtraPhoneNumbersDTO } from 'types';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const extraPhoneNumbersApi = createApi({
  reducerPath: `extraPhoneNumbers`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['ExtraPhoneNumbers', 'ExtraPhoneNumberById'],

  endpoints: (builder) => ({

    // Mutations
    createExtraPhoneNumber: builder.mutation<ExtraPhoneNumbersDTO, Partial<ExtraPhoneNumbersDTO | unknown>>({
      query(data) {
        return {
          url: `/extra-phone-numbers/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['ExtraPhoneNumbers'],
    }),

    updateExtraPhoneNumber: builder.mutation<ExtraPhoneNumbersDTO, Pick<ExtraPhoneNumbersDTO, 'id'>>({
      query({ id, ...variables }) {
        return {
          url: `/extra-phone-numbers/${id}/`,
          method: `PATCH`,
          body: variables,
        }
      },
      invalidatesTags: ['ExtraPhoneNumbers', 'ExtraPhoneNumberById'],
    }),

  }),
});

export const {
  useCreateExtraPhoneNumberMutation,
  useUpdateExtraPhoneNumberMutation
} = extraPhoneNumbersApi;