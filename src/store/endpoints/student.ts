import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersDTO } from "types";
import { NavigationTypes } from "utils/types";

type UsersResponse = NavigationTypes & {
  results: UsersDTO[];
};

export const studentsApi = createApi({
  reducerPath: `students`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Students", "StudentById"],

  endpoints: (builder) => ({
    // Queries
    students: builder.query<
      UsersResponse,
      {
        page?: number ;
        search?: string;
        balance__lt?: number;
        is_removed?: boolean;
        pupils__group__course__direction?: number | string | null;
        pupils__group?: string | null;
        district?: number | null;
        gender?: string | null;
        pupils__group__teacher?: string | null
      } | void
    >({
      query: (queries) => {
        return {
          url: `/users/`,
          params: { ...queries },
        };
      },
      providesTags: ["Students"],
    }),

    studentsFull: builder.query<UsersDTO[], void>({
      query: (queries) => ({
        url: "/users/?is_removed=false&no_page=1",
      }),
      providesTags: ["Students"],
    }),

    studentById: builder.query<UsersDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/users/${id}`,
        };
      },
      providesTags: ["StudentById"],
    }),

    // Mutations
    createStudent: builder.mutation<UsersDTO, Partial<UsersDTO> | any>({
      query(data) {
        return {
          url: `/users/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ["Students"],
    }),

    updateStudent: builder.mutation<UsersDTO, any>({
      query({ id, ...variables }) {
        return {
          url: `/users/${id}/`,
          method: `PATCH`,
          body: variables,
        };
      },
      invalidatesTags: ["Students", "StudentById"],
    }),

    deleteStudent: builder.mutation<UsersDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/users/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useStudentsQuery,
  useStudentsFullQuery,
  useStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
