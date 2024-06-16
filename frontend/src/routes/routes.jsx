import { createBrowserRouter } from "react-router-dom";
import { Route, createRoutesFromElements } from "react-router";
import App from "../App.jsx";
import Login from "../pages/Auth/Navigation/Login.jsx";
import { Register } from "../pages/Auth/Register.jsx";
import Profie from "../pages/Auth/Profie.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import AdminRoute from "../pages/Admin/AdminRoute.jsx";
import UserLists from "../pages/Admin/UserLists.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profie />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminRoute />}>
      <Route path="userlist" element={<UserLists/>} />
      </Route>
    </Route>
  )
);

export default router;
