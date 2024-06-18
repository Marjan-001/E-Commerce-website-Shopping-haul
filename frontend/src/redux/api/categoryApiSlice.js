import { apiSlice } from "./apiSlice";
import { Category_Url } from "../constants";



export  const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCategory:builder.mutation({
            query:(newCategory)=>({
                url:`${Category_Url}`,
                method:"POST",
                body:newCategory

            })
        }),
        updateACategory:builder.mutation({
            query:({categoryId, updatedCategory})=>({
                url:`${Category_Url}/${categoryId}`,
                method:"PUT",
                body:updatedCategory
            })
        }),
        deleteCategory:builder.mutation({
            query:(categoryId)=>({
                url:`${Category_Url}/${categoryId}`,
                method:"DELETE",

            })
        }),
       getCategories:builder.query({
        query:()=>`${Category_Url}/categories`
       }) ,
       getCategory:builder.query({
        query:(id)=>`${Category_Url}/${id}`
       })
    })
})


export const {useCreateCategoryMutation,useDeleteCategoryMutation,useGetCategoriesQuery,useGetCategoryQuery,useUpdateACategoryMutation}=categoryApiSlice
