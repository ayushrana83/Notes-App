import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/User";
import { Axios } from "../axios";
import { toast } from "react-toastify";
import { useTheme } from "../Context/Theme";

type formType = {
  email: string;
  password: string;
};

function Login() {
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { register, handleSubmit, reset } = useForm<formType>();
  const onSubmit: SubmitHandler<formType> = async (data) => {
    // console.log(data);
    const { email, password } = data;
    try {
      const response = await Axios.post("/user/login", { email, password });
      if (response.data) {
        toast.success("login successful");
        loginUser(email, password);
        navigate("/display");
        reset();
      } else {
        toast.warning(response.data.message || "Error in Login");
        console.log("Error in login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Error in Login");
      console.log("Error in login", error);
    }
  };
  return (
    <div
      className={`flex items-center justify-center ${
        theme === "light"
          ? "bg-slate-100 : text-black"
          : "bg-slate-800 text-white"
      }`}
    >
      <div className="m-5">
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 border-2 p-10 rounded-xl"
        >
          <h1 className="text-4xl">Login</h1>
          <div className="">
            <label className="text-2xl" htmlFor="email">
              Email{" "}
            </label>
            <input
              {...register("email")}
              type="text"
              className={`rounded-2xl  p-2 text-lg w-full border bg-transparent outline-none ${theme === "light"
                  ? " text-slate-700"
                  : " text-slate-300"
              }`}
              placeholder="@email"
            />
          </div>
          <div>
            <label className="text-2xl" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className={`rounded-2xl p-2 text-lg w-full border bg-transparent outline-none ${
                theme === "light" ? " text-slate-700" : " text-slate-300"
              }`}
              placeholder="password"
            />
          </div>
          <button className="w-full bg-blue-400 text-white hover:scale-105 hover:bg-blue-500 rounded-2xl py-1 text-xl">
            Login
          </button>
          <div>
            No account ?{" "}
            <Link
              to={"/signup"}
              className="text-lg text-blue-400 hover:text-blue-500"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
