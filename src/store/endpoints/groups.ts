import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GroupsDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: GroupsDTO[];
};

export const groupsApi = createApi({
  reducerPath: `groups`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Groups', 'GroupById'],

  endpoints: (builder) => ({
    // Queries
    groups: builder.query<GetDataType, {
      page?: number,
      search?: string,
      pupils__user?: number,
      course?: number,
      course__direction?: number | string | null,
      teacher?: number | string | null;
      days?: number | string | null;
      room?: number | string | null;
      lessons_start_date?: string | null;
      lessons_end_date?: string | null
    } | void>({
      query: (queries) => ({
        url: "/groups/",
        params: { ...queries }
      }),
      providesTags: ['Groups']
    }),

    groupsFull: builder.query<GroupsDTO[], void>({
      query: (queries) => ({
        url: "/groups/?no_page=1"
      }),
      providesTags: ['Groups'],
    }),

    groupById: builder.query<GroupsDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/groups/${id}/`,
        };
      },
      providesTags: ['GroupById'],
    }),

    // Mutations
    createGroup: builder.mutation<GroupsDTO, Partial<GroupsDTO>>({
      query(data) {
        return {
          url: `/groups/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['Groups'],
    }),
    
    updateGroup: builder.mutation<GroupsDTO, Pick<GroupsDTO, 'id'>>({
      query({ id, ...variables }) {
        return {
          url: `/groups/${id}/`,
          method: `PATCH`,
          body: variables,
        }
      },
      invalidatesTags: ['Groups', 'GroupById'],
    }),

    deleteGroup: builder.mutation<GroupsDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/groups/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Groups']
    }),

  })
})

export const {
  useGroupsQuery,
  useGroupsFullQuery,
  useGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation
} = groupsApi
