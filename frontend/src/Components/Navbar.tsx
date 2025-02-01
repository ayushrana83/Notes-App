import { useTheme } from "../Context/Theme";
import { useUser } from "../Context/User";
import Sun from "../assets/Pictures/Svg/Sun.svg";
import Moon from "../assets/Pictures/Svg/Moon.svg";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../axios";
import { toast } from "react-toastify";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios.post("/user/logout");
      if(response.data)
      {
        toast.success("Logout Successfull");
        logoutUser();
        navigate("/");
      }
      else
      {
        toast.warning(response.data.message || "Error in Logout");
        console.log("error in logout");
      }
    } catch (error : any) {
      toast.error(error.response.data.message || "Error in Logout");
      console.log("error in logout" , error);
    }
  }
  // console.log(theme);
  return (
    <div
      className={`p-5 flex justify-around items-center max-w-screen-2xl ${
        theme === "light" ? "bg-slate-200 " : "bg-slate-900"
      }`}
    >
      <div className="hover:scale-105">
        {/* logo */}
        <Link to={"/"} className="text-5xl tracking-tighter">Grind</Link>
      </div>
      <div className="flex gap-5">
        <div onClick={() => toggleTheme()} className="cursor-pointer hover:scale-105">
          <img 
            className={`w-10 h-10 rounded-full p-2 ${
              theme === "light" ? "bg-slate-700 text-white" : "text-black bg-slate-200"
            }`}
            src={theme === "light" ? Moon : Sun}
            alt=""
          />
        </div>
        {user ? (
          <button
            onClick={() => handleLogout()}
            className=" bg-blue-400 text-white hover:scale-105 hover:bg-blue-500 rounded-2xl px-4 py-2 lg:px-6 lg:py-2 text-xl"
          >
            Logout
          </button>
        ) : (
          <Link
            to={"/login"}
            className=" bg-blue-400 hover:scale-105 hover:bg-blue-500 text-white rounded-2xl px-4 py-2 lg:px-6 lg:py-2 text-xl"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
