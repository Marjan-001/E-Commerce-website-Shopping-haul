import { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import loginAnimation from "../../../public/Animation - 1718391404058.json";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import Lottie from "lottie-react";
import loader from '../../../public/Animation - 1718452914517.json'

export const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispath = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispath(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("User created successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <section className="pl-[15rem]  flex items-center   flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
      {isLoading &&   <Lottie className="size-60" loop={true}
        animationData={loader}  /> }
        <h1 className="text-3xl font-semibold mb-4 text-white">Register</h1>

        <form onSubmit={handleSubmit} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={username}
              className="mt-1 p-2 border rounded w-full"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 p-2 border rounded w-full"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="mt-1 p-2 border rounded w-full"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPass"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              value={confirmPassword}
              className="mt-1 p-2 border rounded w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#854F5C]  hover:bg-[#b06476de] text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Loading.." : "Register"}
          </button>
         
        </form>
       
        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-600 hover:underline"
            >
              Login
            </Link>
          </p>
        
        </div>

      </div>
      <Lottie
        className="w-[45%]  xl:block  lg:hidden md:hidden hidden "
        loop={true}
        animationData={loginAnimation}
      />
    </section>
  );
};
