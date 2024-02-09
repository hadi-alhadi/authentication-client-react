import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISigninRequest } from "../interfaces/signin.interface";
import { ISignupRequest } from "../interfaces/signup.interface";

export const authAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/auth" }),
  endpoints: (builder) => ({
    // eslint-disable-next-line
    // @typescript-eslint/no-explicit-any
    signin: builder.mutation<any, ISigninRequest>({
      query: ({ email, password }) => ({
        url: `signin`,
        method: "POST",
        body: { email, password },
      }),
    }),
    // eslint-disable-next-line
    // @typescript-eslint/no-explicit-any
    signup: builder.mutation<any, ISignupRequest>({
      query: ({ name, email, password }) => ({
        url: `signup`,
        method: "POST",
        body: { name, email, password },
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authAPI;
