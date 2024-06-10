
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Base_Url } from '../constants'

export const apiSlice = createApi({

    baseQuery: fetchBaseQuery({baseUrl:Base_Url}),
    tagTypes:["Product" , "Order", "User", "Category"],
    endpoints:()=>({}),
    
})