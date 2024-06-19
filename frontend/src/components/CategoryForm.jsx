const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full "
          placeholder="Write Category Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-[#854F5C]  hover:bg-[#b06476de] text-white py-2 px-4 rounded-lg ">
            {buttonText}
          </button>
          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
