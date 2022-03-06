import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LessonsDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: LessonsDTO[];
};

export const lessonsApi = createApi({
  reducerPath: `lessons`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Lessons", "LessonById", "LessonsByGroup"],

  endpoints: (builder) => ({
    // Queries
    lessons: builder.query<GetDataType, { page?: number; no_page?: number; group?: number } | void
    >({
      query: (queries) => ({
        url: "/lessons/",
        params: { ...queries },
      }),
      providesTags: ["Lessons"],
    }),

    lessonsFull: builder.query<LessonsDTO[],
      {
        group?: number;
        scheduled_time_from?: string;
        scheduled_time_to?: string;
      } | void
    >({
      query: (queries) => ({
        url: "/lessons/?no_page=1",
        params: { ...queries },
      }),
      providesTags: ["Lessons"],
    }),

    lessonsBygroup: builder.query<LessonsDTO[], { group?: number } | void>({
      query: (queries) => ({
        url: "/lessons/?no_page=1",
        params: { ...queries },
      }),
      providesTags: ["LessonsByGroup"],
    }),

    lessonById: builder.query<LessonsDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/lessons/${id}/`,
        };
      },
      providesTags: ["LessonById"],
    }),

    // Mutations
    createLesson: builder.mutation<LessonsDTO, Partial<LessonsDTO>>({
      query(data) {
        return {
          url: `/lessons/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ["Lessons", "LessonsByGroup"],
    }),

    updateLesson: builder.mutation<LessonsDTO, Pick<LessonsDTO, "id">>({
      query({ id, ...variables }) {
        return {
          url: `/lessons/${id}/`,
          method: `PATCH`,
          body: variables,
        };
      },
      invalidatesTags: ["Lessons", "LessonById", "LessonsByGroup"],
    }),

    deleteLesson: builder.mutation<LessonsDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/lessons/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ["Lessons"],
    }),
  }),
});

export const {
  useLessonsQuery,
  useLessonsFullQuery,
  useLessonsBygroupQuery,
  useLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonsApi;
