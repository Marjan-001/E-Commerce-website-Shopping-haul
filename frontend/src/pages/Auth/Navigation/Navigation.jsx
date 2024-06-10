import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation} from "../../../redux/api/usersApiSlice";
import { logout } from "../../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  //......declare dispatch and navigate

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();

      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#190019] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex  items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2  mt-[3rem]" size={26} />
          <span className="hidden  nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        <Link
          to="/shopping"
          className="flex  items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2  mt-[3rem]" size={26} />
          <span className="hidden  nav-item-name mt-[3rem]">Shopping</span>{" "}
        </Link>
        <Link
          to="/cart"
          className="flex  items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2  mt-[3rem]" size={26} />
          <span className="hidden  nav-item-name mt-[3rem]">Cart</span>{" "}
        </Link>

        <Link
          to="/login"
          className="flex  items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2  mt-[3rem]" size={26} />
          <span className="hidden  nav-item-name mt-[3rem]">
            Favourite
          </span>{" "}
        </Link>
      </div>

      {/* ........... */}

      <div className="relative">
        <button
          onClick={toggleDropDown}
          className=" flex items-center text-white focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white text-sm overflow-hidden  ">
              {userInfo.username.toUpperCase()}
            </span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropDownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropDownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-[#854F5C] text-white ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-[#855f5cc4]"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-[#855F5cc4]"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-[#855F5cc4]"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-[#855F5cc4]"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-[#855F5cc4]"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-[#855F5cc4]">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-[#855F5cc4]"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/register"
              className="flex  items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2  mt-[3rem]" size={26} />
              <span className="hidden  nav-item-name mt-[3rem]">
                Register
              </span>{" "}
            </Link>
            <Link
              to="/login"
              className="flex  items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2  mt-[3rem]" size={26} />
              <span className="hidden  nav-item-name mt-[3rem]">
                Login
              </span>{" "}
            </Link>
          </li>
        </ul> 
      )}
    </div>
  );
};

export default Navigation;
