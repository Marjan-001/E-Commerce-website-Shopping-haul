import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../../redux/api/usersApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredientials } from "../../../redux/features/auth/authSlice";
import Lottie from "lottie-react";
import loginAnimation from "../../../../public/Animation - 1718391404058.json";
import loader from "../../../../public/Animation - 1718452914517.json";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation;
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredientials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex items-center   flex-wrap">
        <div className="mr-[4rem] mt-[5rem] ">
        {isLoading && (
              <Lottie
                className="size-60 flex items-center "
                loop={true}
                animationData={loader}
              />
            )}
          <h1 className="text-3xl font-semibold mb-4 text-white">Sign In</h1>
          <form onSubmit={submitHandle} className="container w-[40rem]">
          
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
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
            <div>
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
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#854F5C]  hover:bg-[#b06476de] text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Loading.." : "Sign In"}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <Lottie
          className="w-[48%]  xl:block  lg:hidden md:hidden hidden "
          loop={true}
          animationData={loginAnimation}
        />
      </section>
    </div>
  );
};

export default Login;
