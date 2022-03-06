import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TeacherSalariesDTO, TeachersDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataTypes = NavigationTypes & {
  results: TeachersDTO[];
};

export const teachersApi = createApi({
  reducerPath: `teachers`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Teachers", "TeacherSalaries", "TeacherById"],

  endpoints: (builder) => ({
    // Queries
    teachers: builder.query<
      GetDataTypes,
      {
        page?: number;
        search?: string;
        groups__course__direction?: string | null;
        gender?: string | null;
        district: string | null;
      } | void
    >({
      query: (queries) => {
        return {
          url: "/teachers/",
          params: { ...queries },
        };
      },
      providesTags: ["Teachers"],
    }),

    teachersFull: builder.query<TeachersDTO[], void>({
      query: (queries) => ({
        url: "/teachers/?no_page=1",
      }),
      providesTags: ["Teachers"],
    }),

    teacherSalaries: builder.query<
      TeacherSalariesDTO[],
      { date_from?: string; date_to?: string } | void
    >({
      query: (queries) => {
        return {
          url: "/teachers/calculate_salaries",
          params: { ...queries },
        };
      },
      providesTags: ["TeacherSalaries"],
    }),

    teacherById: builder.query<TeachersDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/teachers/${id}/`,
        };
      },
      providesTags: ["TeacherById"],
    }),

    // Mutations
    createTeacher: builder.mutation<TeachersDTO, Partial<TeachersDTO> | any>({
      query(data) {
        return {
          url: `/teachers/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ["Teachers"],
    }),

    updateTeacher: builder.mutation<TeachersDTO, any>({
      query({ id, ...variables }) {
        return {
          url: `/teachers/${id}/`,
          method: `PATCH`,
          body: variables,
        };
      },
      invalidatesTags: ["Teachers", "TeacherById"],
    }),

    deleteTeacher: builder.mutation<TeachersDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/teachers/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useTeachersQuery,
  useTeachersFullQuery,
  useTeacherSalariesQuery,
  useTeacherByIdQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teachersApi;
