import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClientsDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: ClientsDTO[];
};

export const clientsApi = createApi({
  reducerPath: `clients`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Clients", "ClientsById"],

  endpoints: (builder) => ({
    // Queries
    clients: builder.query<
      GetDataType,
      {
        branch?: string;
        direction?: string;
        source?: string;
        status?: number | string;
        search?: string;
        page?: number;
      } | void
    >({
      query: (queries) => ({
        url: "/clients/",
        params: { ...queries },
      }),
      providesTags: ["Clients"],
    }),

    clientsFull: builder.query<ClientsDTO[], void>({
      query: (queries) => ({
        url: "/clients/?no_page=1",
      }),
      providesTags: ["Clients"],
    }),

    clientsById: builder.query<ClientsDTO, { id?: number | null }>({
      query: ({ id }) => {
        return {
          url: `/clients/${id}/`,
        };
      },
      providesTags: ["ClientsById"],
    }),

    // Mutations
    createClient: builder.mutation<ClientsDTO, Partial<ClientsDTO>>({
      query(data) {
        return {
          url: "/clients/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Clients"],
    }),

    updateClient: builder.mutation<ClientsDTO, any>({
      query({ id, ...variables }) {
        return {
          url: `/clients/${id}/`,
          method: `PATCH`,
          body: variables,
        };
      },
      invalidatesTags: ["Clients", "ClientsById"],
    }),

    deleteClient: builder.mutation<ClientsDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/clients/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useClientsQuery,
  useClientsFullQuery,
  useClientsByIdQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientsApi;
