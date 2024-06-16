import { useEffect, useState } from "react";
import { FaTimes, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import loading from "../../../public/Animation - 1718452914517.json";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Lottie from "lottie-react";
import Message from "../../components/Message";

const UserLists = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [userIdEdit, setUserIdEdit] = useState(null);
  const [emailEdit, setEmailEdit] = useState("");
  const [userNameEdit, setUserNameEdit] = useState("");
  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setUserIdEdit(id);
    setEmailEdit(email);
    setUserNameEdit(username);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: userNameEdit,
        email: emailEdit,
      });
      setUserIdEdit(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center text-white font-semibold mb-4">
        Users
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie loop={true} className="size-60" animationData={loading} />
        </div>
      ) : error ? (
        <Message variant="danger">
          {" "}
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2  text-white text-left">ID</th>
                <th className="px-4 py-2  text-white text-left">Name</th>
                <th className="px-4 py-2  text-white text-left">Email</th>
                <th className="px-4 py-2  text-white text-left">Admin</th>
                <th className="px-4 py-2  text-white text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2  text-white">{user._id}</td>
                  <td className="px-4 py-2  text-white ">
                    {userIdEdit === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={userNameEdit}
                          onChange={(e) => setUserNameEdit(e.target.value)}
                          className=" w-full p-2 text-black border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}
                        <button
                          className=""
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem] " />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-white ">
                    {userIdEdit === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={emailEdit}
                          onChange={(e) => setEmailEdit(e.target.value)}
                          className="w-full p-2 text-black border roundedd-lg"
                        />
                        <button
                          onChange={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserLists;
