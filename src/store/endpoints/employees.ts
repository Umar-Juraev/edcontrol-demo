import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmployeesDTO } from "types";
import { NavigationTypes } from "utils/types";

type UsersResponse = NavigationTypes & {
  results: EmployeesDTO[];
};

export const employeesApi = createApi({
  reducerPath: `employees`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Employees', 'EmployeeById'],

  endpoints: (builder) => ({
    // Queries
    employees: builder.query<UsersResponse, void>({
      query: () => {
        return {
          url: `/employees/`,
        };
      },
      providesTags: ['Employees']
    }),

    employeesFull: builder.query<EmployeesDTO[], void>({
      query: (queries) => ({
        url: "/employees/?no_page=1"
      }),
      providesTags: ['Employees'],
    }),

    employeeById: builder.query<EmployeesDTO, { id?: number }>({
      query: ({ id }) => {
        return {
          url: `/employees/${id}`,
        };
      },
      providesTags: ['EmployeeById']
    }),

    // Mutations
    createEmployee: builder.mutation<EmployeesDTO, Partial<EmployeesDTO>>({
      query(data) {
        return {
          url: "/employees/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Employees"],
    }),

    updateEmployee: builder.mutation<EmployeesDTO, Pick<EmployeesDTO, "id">>({
      query({ id, ...variables }) {
        return {
          url: `/employees/${id}/`,
          method: `PATCH`,
          body: variables,
        };
      },
      invalidatesTags: ["Employees", "EmployeeById"],
    }),

    deleteEmployee: builder.mutation<EmployeesDTO, { id?: number }>({
      query({ id }) {
        return {
          url: `/employees/${id}/`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ["Employees"],
    }),

  }),
});

export const {
  useEmployeesQuery,
  useEmployeesFullQuery,
  useEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} = employeesApi;
