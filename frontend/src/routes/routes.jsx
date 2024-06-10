import { createBrowserRouter } from "react-router-dom";
import { Route, createRoutesFromElements } from "react-router";
import App from "../App.jsx";
import Login from "../pages/Auth/Navigation/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}>

    <Route path="/login" element={<Login/>}/>
  </Route>)
);

export default router;