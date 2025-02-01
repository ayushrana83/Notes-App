import { Route, Routes } from "react-router-dom";
import AddForm from "./Components/AddForm";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NoPage from "./Components/NoPage";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Display from "./Components/Display";
import { useTheme } from "./Context/Theme";
import Details from "./Components/Details";
import Authenticated from "./Components/Authenticated";
import { useUser } from "./Context/User";
import { useEffect } from "react";
import { useProblems } from "./Context/ProblemsContext";
import { Axios } from "./axios";

function App() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { setProblems } = useProblems();

  useEffect(() => {
    const getProblems = async () => {
      try {
        const response = await Axios.get("/problem/all");
        if (response.data) {
          // console.log("response.data = = " , response.data);
          response.data.problems && setProblems(response.data.problems);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getProblems();
    }
  }, [user]);
  // console.log(theme);
  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-slate-100 : text-black"
          : "bg-slate-800 text-white"
      }`}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/display"
            element={
              <Authenticated>
                <Display />
              </Authenticated>
            }
          />
          <Route
            path="/addForm/"
            element={
              <Authenticated>
                <AddForm />
              </Authenticated>
            }
          />
          <Route
            path="/addForm/:id"
            element={
              <Authenticated>
                <AddForm />
              </Authenticated>
            }
          />
          <Route
            path="/details/:id"
            element={
              <Authenticated>
                <Details />
              </Authenticated>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
