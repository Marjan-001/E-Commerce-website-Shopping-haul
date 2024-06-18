import { toast } from "react-toastify"
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice"


const CategoryLists = () => {

    const{data:categories} = useGetCategoriesQuery();

  return (
    <div>fffff</div>
  )
}

export default CategoryLists