import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PhotosDTO } from "types";

type ResponseType = {
  data: PhotosDTO;
}

export const photosApi = createApi({
  reducerPath: `photos`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Photos'],

  endpoints: (builder) => ({
    // Mutations
    createPhoto: builder.mutation<ResponseType, any>({
      query(data) {
        return {
          url: `/photos/`,
          method: `POST`,
          body: data
        };
      },
      invalidatesTags: ['Photos'],
    }),
  }),
});

export const { useCreatePhotoMutation } = photosApi;
