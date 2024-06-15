import { useEffect, useState } from "react";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loader from "../../../public/Animation - 1718452914517.json";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/auth/authSlice";
const Profie = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: lodingUpdateProfile }] =
    useProfileMutation();
  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);
  const dispatch = useDispatch();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Passwords do not match")
    }else{
      try {

        const res = await updateProfile({_id: userInfo._id,username,email,password}).unwrap()
        dispatch(setCredientials({...res}))
        toast.success("Profile Updated Successfully")


        
      } catch (error) {
       toast.error(error?.data?.message || error.message) 
      }
    }
  }

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          {lodingUpdateProfile && <Lottie loop={true} animationData={loader} />}

          <h2 className="text-3xl font-semibold text-white mb-4">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit} className=" ">
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#854F5C] hover:bg-[#b06476de] text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-[#854F5C] hover:bg-[#b06476de] text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profie;
