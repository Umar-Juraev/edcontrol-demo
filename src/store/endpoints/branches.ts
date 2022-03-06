import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BranchesDTO } from "types/branches";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: BranchesDTO[];
};

export const branchApi = createApi({
  reducerPath: `branches`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Branches", "BranchById"],

  endpoints: (builder) => ({
    // Queries
    branches: builder.query<GetDataType, void>({
      query: () => {
        return {
          url: `/branches/`,
        };
      },
      providesTags: ["Branches"],
    }),

    createBranch: builder.mutation<BranchesDTO, Partial<BranchesDTO>>({
      query(data) {
        return {
          url: `/branches/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ["Branches"],
    }),

    updateBranch: builder.mutation<BranchesDTO, Pick<BranchesDTO, 'id'>>({
      query({ id, ...variables }) {
        return {
          url: `/branches/${id}/`,
          method: `PATCH`,
          body: variables,
        }
      },
      invalidatesTags: ['Branches', 'BranchById'],
    }),

    deleteBranch: builder.mutation<BranchesDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/branches/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Branches']
    }),

  })
});

export const {
  useBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation
} = branchApi;
