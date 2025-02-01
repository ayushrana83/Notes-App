import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/User";
import { Axios } from "../axios";
import { toast } from "react-toastify";
import { useTheme } from "../Context/Theme";

type formType = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const navigate = useNavigate();
  const { signUpUser } = useUser();
  const {theme} = useTheme();
  const { register, handleSubmit, reset } = useForm<formType>();
  const onSubmit: SubmitHandler<formType> = async (data) => {
    // console.log(data);
    const { email, password, confirmPassword } = data;
    try {
      const response = await Axios.post("/user/signup", {
        email,
        password,
        confirmPassword,
      });
      if (response.data) {
        // console.log("signup successfull");
        toast.success("Signup Succesfull");
        signUpUser(email, password, confirmPassword);
        navigate("/display");
        reset();
      } else {
        toast.warning(response.data.message || "Error in Signup");
        // console.log("Error in signup");
      }
    } catch (error: any) {
      toast.warning(error.response.data.message || "Error in Signup");
      // console.log("error in signup", error);
    }
  };
  return (
    <div className={`w-full flex items-center justify-center ${
      theme === "light"
        ? "bg-slate-100 : text-black"
        : "bg-slate-800 text-white"
    }`}>
      <div className="">
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 border-2 p-10 rounded-xl"
        >
          <h1 className="text-4xl">Signup</h1>
          <div className="">
            <label className="text-2xl" htmlFor="email">
              Email{" "}
            </label>
            <input
              {...register("email")}
              type="text"
              className={`rounded-2xl p-2 text-lg w-full border bg-transparent outline-none ${theme === "light"
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
              className={`rounded-2xl p-2 text-lg w-full border bg-transparent outline-none ${theme === "light"
                ? " text-slate-700"
                : " text-slate-300"
            }`}
              placeholder="password"
            />
          </div>
          <div>
            <label className="text-2xl" htmlFor="password">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className={`rounded-2xl p-2 text-lg w-full border bg-transparent outline-none ${theme === "light"
                ? " text-slate-700"
                : " text-slate-300"
            }`}
              placeholder="password"
            />
          </div>
          <button className="w-full bg-blue-400 text-white hover:scale-105 hover:bg-blue-500 rounded-2xl py-1 text-xl">
            Signup
          </button>
          <div>
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-lg text-blue-400 hover:text-blue-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
