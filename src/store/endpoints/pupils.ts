import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PupilsDTO, UsersDTO } from "types";
import { NavigationTypes } from "utils/types";

type UsersResponse = NavigationTypes & {
  results: PupilsDTO[];
};

export const pupilsApi = createApi({
  reducerPath: `pupils`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Pupils', 'PupilsFull', 'PupilById', 'Students', 'StudentById'],

  endpoints: (builder) => ({
    // Queries
    pupils: builder.query<UsersResponse, { user?: any, group?: number, page?: number, no_page?: number } | void>({
      query: (queries) => {
        return {
          url: `/pupils/`,
          params: { ...queries }
        };
      },
      providesTags: ['Pupils'],
    }),

    pupilsFull: builder.query<PupilsDTO[], { group?: number }>({
      query: ({ group }) => ({
        url: `/pupils/?no_page=1&group=${group}`
      }),
      providesTags: ['PupilsFull'],
    }),

    pupilById: builder.query<PupilsDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/pupils/${id}`,
        };
      },
      providesTags: ['PupilById'],
    }),

    // Mutations
    createPupil: builder.mutation<PupilsDTO, Partial<PupilsDTO | unknown>>({
      query(data) {
        return {
          url: `/pupils/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['Pupils', 'PupilsFull', 'PupilById', 'Students', 'StudentById'],
    }),

    updatePupil: builder.mutation<PupilsDTO, Partial<PupilsDTO>>({
      query({ id, ...variables }) {
        return {
          url: `/pupils/${id}/`,
          method: `PATCH`,
          body: variables,
        }
      },
      invalidatesTags: ['Pupils', 'PupilsFull', 'PupilById', 'Students', 'StudentById'],
    }),

    deletePupil: builder.mutation<{}, { id?: number }>({
      query({ id }) {
        return {
          url: `/pupils/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Pupils', 'PupilsFull', 'PupilById', 'Students', 'StudentById'],
    }),

  }),
});

export const {
  usePupilsQuery,
  usePupilsFullQuery,
  usePupilByIdQuery,
  useCreatePupilMutation,
  useUpdatePupilMutation,
  useDeletePupilMutation
} = pupilsApi;
