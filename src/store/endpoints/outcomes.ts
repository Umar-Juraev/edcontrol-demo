import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OutcomesDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: OutcomesDTO[];
};

export const outcomesApi = createApi({
  reducerPath: `outcomes`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Outcomes', 'OutcomeById'],

  endpoints: (builder) => ({
    // Queries
    outcomes: builder.query<GetDataType, {
      page?: number,
      reason?: number | null,
      employee?: number | null,
      created_time__gte?: string | null,
      created_time__lte?: string | null
    } | void>({
      query: (queries) => {
        return {
          url: `/outcomes/`,
          params: { ...queries }
        }
      },
      providesTags: ['Outcomes'],
    }),

    outcomeById: builder.query<OutcomesDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/outcomes/${id}/`
        }
      },
      providesTags: ['OutcomeById'],
    }),

    // Mutations
    createOutcome: builder.mutation<OutcomesDTO, Partial<OutcomesDTO>>({
      query(data) {
        return {
          url: `/outcomes/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['Outcomes'],
    }),

    updateOutcome: builder.mutation<OutcomesDTO, Partial<OutcomesDTO>>({
      query(data) {
        return {
          url: `/outcomes/${data.id}/`,
          method: `PATCH`,
          body: data,
        };
      },
      invalidatesTags: ['Outcomes', 'OutcomeById'],
    }),

    deleteOutcome: builder.mutation<OutcomesDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/outcomes/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Outcomes', 'OutcomeById'],
    })

  }),
});

export const {
  useOutcomesQuery,
  useOutcomeByIdQuery,
  useCreateOutcomeMutation,
  useDeleteOutcomeMutation,
  useUpdateOutcomeMutation,
} = outcomesApi;
