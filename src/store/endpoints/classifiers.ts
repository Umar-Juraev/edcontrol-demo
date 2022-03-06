import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DirectionsDTO, DistrictTypes, ProviderTypes, ReasonsTypes, RegionsTypes, SourcesTypes, StatusesTypes, WeekDaysTypes } from "types";

export const classifiersApi = createApi({
  reducerPath: `classifiers`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    directions: builder.query<DirectionsDTO[], void>({
      query: () => {
        return {
          url: `/classifiers/directions/`
        };
      }
    }),

    districts: builder.query<DistrictTypes[], { region?: number, search?: string, page?: number }>({
      query: ({ region, search, page }) => {
        return {
          url: `/classifiers/districts/`,
          params: {
            region,
            search,
            page
          }
        };
      }
    }),

    districtById: builder.query<DistrictTypes, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/classifiers/districts/${id}/`,
        };
      },
    }),

    providers: builder.query<ProviderTypes[], void>({
      query: () => {
        return {
          url: `/classifiers/providers/`
        };
      }
    }),

    reasons: builder.query<ReasonsTypes[], void>({
      query: () => {
        return {
          url: `/classifiers/reasons/`
        };
      }
    }),

    regions: builder.query<RegionsTypes[], void>({
      query: () => {
        return {
          url: `/classifiers/regions/`
        };
      }
    }),

    sources: builder.query<SourcesTypes[], void>({
      query: () => {
        return {
          url: `/classifiers/sources/`
        };
      }
    }),

    statuses: builder.query<StatusesTypes[], void>({
      query: () => {
        return {
          url: `/classifiers/statuses/`
        };
      }
    }),

    weekdays: builder.query<WeekDaysTypes[], void>({
      query: () => {
        return {
          url: `/classifiers/weekdays/`
        };
      }
    }),
  })

})

export const {
  useDirectionsQuery,
  useDistrictsQuery,
  useDistrictByIdQuery,
  useProvidersQuery,
  useReasonsQuery,
  useRegionsQuery,
  useSourcesQuery,
  useStatusesQuery,
  useWeekdaysQuery
} = classifiersApi
