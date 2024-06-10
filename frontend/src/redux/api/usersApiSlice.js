import { User_Url } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        //http://localhost:5000/api/users/auth
        url: `${User_Url}/auth`,
        method: "POST",
        body: data,
      }),
      
      }),
      logout: builder.mutation({
        query: () => ({
          url: `${User_Url}/logout`,
          method: "POST",
        }),
    }),
  }),
});

export const { useLoginMutation,useLogoutMutation } = userApiSlice;
