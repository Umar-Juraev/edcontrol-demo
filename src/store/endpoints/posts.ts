import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostsDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: PostsDTO[];
};

export const postsApi = createApi({
  reducerPath: `posts`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Posts', 'PostById'],

  endpoints: (builder) => ({
    // Queries
    posts: builder.query<GetDataType, { page?: number, student?: number, employee?: number } | void>({
      query: (queries) => {
        return {
          url: `/posts/`,
          params: { ...queries }
        }
      },
      providesTags: ['Posts'],
    }),

    postById: builder.query<PostsDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/posts/${id}/`
        }
      },
      providesTags: ['PostById'],
    }),

    // Mutations
    createPost: builder.mutation<PostsDTO, { receivers: number[], text: string }>({
      query(data) {
        return {
          url: `/posts/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation<PostsDTO, Partial<PostsDTO>>({
      query(data) {
        return {
          url: `/posts/${data.id}/`,
          method: `PATCH`,
          body: data,
        };
      },
      invalidatesTags: ['Posts', 'PostById'],
    }),

    deletePost: builder.mutation<PostsDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/posts/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Posts', 'PostById'],
    })

  }),
});

export const {
  usePostsQuery,
  usePostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi;
