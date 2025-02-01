import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, Zoom } from "react-toastify";

function Layout() {
  const screenWidth = window.innerWidth;
  // console.log(screenWidth);
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom} 
        toastStyle={screenWidth < 550 ? {
          width: '250px',  
          height: '60px',  
          fontSize: '18px',
          padding: '20px',
          margin : "5px" 
        } : {}}
      />
      <Outlet />
    </>
  );
}

export default Layout;
