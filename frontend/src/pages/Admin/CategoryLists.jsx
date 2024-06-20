import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateACategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { useState } from "react";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const CategoryLists = () => {
  const { data: categories, refetch } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateACategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name required");
      return;
    }
    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success(`${res.name} successfully created`);
        refetch();
      }
    } catch (error) {
      toast.error("Creating category failed.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updateName,
        },
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} is updated`);
        setUpdateName("");
        setSelectedCategory(null);
        setShowModal(false);
        refetch();
      }
    } catch (error) {
      return
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} is deleted`);
        setSelectedCategory(null);
        setShowModal(false);
        refetch()
      }
    } catch (error) {
      toast.error("Deletion Failed");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-4">
        <div className="h-12 text-2xl text-white">Categories Management</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              
              <button
                onClick={() => {
                  {
                    setShowModal(true);
                    setSelectedCategory(category);
                    setUpdateName(category.name);
                  }
                }}  
                className="bg-transparent outline outline-[#DFB6B2]  text-[#DFB6B2]  hover:bg-[#b06476de] hover:text-white py-2 px-4 rounded-lg m-3 "
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleDelete={handleDeleteCategory}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryLists;
