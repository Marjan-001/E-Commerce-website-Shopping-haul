import {Outlet} from "react-router-dom"
import Navigation from "./pages/Auth/Navigation/Navigation.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App=() =>{

  return (
    <div >
       <ToastContainer  />
       <Navigation />
    <main className="py-2">
      <Outlet/>
    </main>
    </div>
  )
}

export default App
