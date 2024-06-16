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
      query: (data) => ({
        url: `${User_Url}`,
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${User_Url}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query:()=>({
        url:User_Url,
      }),
      providesTags:['User'],
      keepUnusedDataFor:5,
    }),
    deleteUser:builder.mutation({
      query: (userId)=>({
        url:`${User_Url}/${userId}`,
        method:'DELETE',
      })
    }),

    getUserDetails:builder.query({
      query:(id)=>({
       url:`${User_Url}/${id}` ,
     
      }),
      keepUnusedDataFor:5
    }),

    updateUser:builder.mutation({
      query:data=>({
        url:`${User_Url}/${data.userId}`,
        method:'PUT',
        body: data
      }),
      invalidatesTags:['User']
    })

  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUserDetailsQuery, useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } =
  userApiSlice;
