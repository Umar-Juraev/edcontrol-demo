import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MaterialDTO } from "types/materials";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: MaterialDTO[];
};

export const materialsApi = createApi({
  reducerPath: `material`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Materials", "MaterailById"],

  endpoints: (builder) => ({
    materials: builder.query<
      GetDataType,
      {
        course?: number;
        title?: string;
        body?: string;
        creat_time?: string | null;
        last_updated_time?: string | null;
      } | void
    >({
      query: (queries) => ({
        url: "/materials/",
        params: { ...queries },
      }),
      providesTags: ["Materials"],
    }),
    materialsFull: builder.query<MaterialDTO[], void>({
      query: (queries) => ({
        url: "/materials/",
      }),
      providesTags: ["Materials"],
    }),

    materialById: builder.query<MaterialDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/materials/${id}/`,
        };
      },
      providesTags: ["MaterailById"],
    }),
  }),
});

export const {
  useMaterialsQuery,
  useMaterialsFullQuery,
  useMaterialByIdQuery,
} = materialsApi;
