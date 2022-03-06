import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RoomsDTO } from "types";
import { NavigationTypes } from "utils/types";

type GetDataType = NavigationTypes & {
  results: RoomsDTO[];
};

export const roomApi = createApi({
  reducerPath: `room`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Rooms', 'RoomById'],

  endpoints: (builder) => ({
    // Queries
    rooms: builder.query<GetDataType, { page?: number, no_page?: number } | void>({
      query: (queries) => ({
        url: "/rooms/",
        params: { ...queries }
      }),
      providesTags: ['Rooms']
    }),

    roomsFull: builder.query<RoomsDTO[], void>({
      query: (queries) => ({
        url: "/rooms/?no_page=1"
      }),
      providesTags: ['Rooms'],
    }),

    // Mutations
    createRoom: builder.mutation<RoomsDTO, Partial<RoomsDTO>>({
      query(data) {
        return {
          url: `/rooms/`,
          method: `POST`,
          body: data,
        };
      },
      invalidatesTags: ['Rooms']
    }),

    updateRoom: builder.mutation<RoomsDTO, Pick<RoomsDTO, 'id'>>({
      query({ id, ...variables }) {
        return {
          url: `/rooms/${id}/`,
          method: `PATCH`,
          body: variables,
        };
      },
      invalidatesTags: ['Rooms', 'RoomById']
    }),

    deleteRoom: builder.mutation<{}, { id: number }>({
      query({ id }) {
        return {
          url: `/rooms/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ['Rooms', 'RoomById']
    })

  })
});

export const {
  useRoomsQuery,
  useRoomsFullQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation
} = roomApi