import ReactDOM from "react-dom/client";


import { RouterProvider } from "react-router";
import router from "./routes/routes.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
 
 <Provider store={store}>

   <RouterProvider router={router} />
 </Provider>
);
