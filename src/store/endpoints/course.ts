import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoursesDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: CoursesDTO[];
}

export const coursesApi = createApi({
  reducerPath: `courses`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Courses', 'CourseById'],

  endpoints: (builder) => ({
    // Queries
    courses: builder.query<GetDataType, { page?: number, no_page?: number } | void>({
      query: (queries) => ({
        url: "/courses/",
        params: { ...queries }
      }),
      providesTags: ['Courses'],
    }),

    coursesFull: builder.query<CoursesDTO[], void>({
      query: (queries) => ({
        url: "/courses/?no_page=1"
      }),
      providesTags: ['Courses'],
    }),

    courseById: builder.query<CoursesDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/courses/${id}/`,
        };
      },
      providesTags: ['CourseById']
    }),

    // Mutations
    createCourse: builder.mutation<CoursesDTO, Partial<CoursesDTO>>({
      query(data) {
        return {
          url: `/courses/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['Courses'],
    }),

    updateCourse: builder.mutation<CoursesDTO, Pick<CoursesDTO, 'id'>>({
      query({ id, ...variables }) {
        return {
          url: `/courses/${id}/`,
          method: `PATCH`,
          body: variables,
        }
      },
      invalidatesTags: ['Courses', 'CourseById']
    }),

    deleteCourse: builder.mutation<CoursesDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/courses/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Courses']
    }),

  })
})

export const {
  useCoursesQuery,
  useCoursesFullQuery,
  useCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation
} = coursesApi
