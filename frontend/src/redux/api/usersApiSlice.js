import { User_Url } from "../constants.js";
import { apiSlice } from "./apiSlice.js";


// endpoints
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
    register: builder.mutation({
      query:(data)=>({
        url: `${User_Url}`,
        method:"POST",
        body:data
      })
    })
  }),
});

export const { useLoginMutation,useLogoutMutation, useRegisterMutation } = userApiSlice;
