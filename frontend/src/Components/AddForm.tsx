import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../Context/Theme";
import { useProblems } from "../Context/ProblemsContext";
import { Axios } from "../axios";
import { useEffect } from "react";
import back from "../assets/Pictures/Svg/Back.svg";
import { toast } from "react-toastify";

type ProblemDetails = {
  _id: string | undefined;
  number: number;
  title: string;
  difficulty: string;
  description: string;
  code: string;
  notes: string;
  tag1: string;
  tag2: string;
  tag3: string;
};

function AddForm() {
  const { theme } = useTheme();
  const { addProblem, getProblem, editProblem } = useProblems();
  const { register, handleSubmit, reset, setValue } = useForm<ProblemDetails>();
  const navigate = useNavigate();
  const params = useParams();
  const _id = params.id;
  const tagsArray: string[] = [
    "-- tag --",
    "Array",
    "String",
    "Searching",
    "Sorting",
    "Hash Table",
    "Dynamic Programming",
    "BFS",
    "DFS",
    "Greedy",
    "Bit Manipulation",
    "Prefix Sum",
    "Design",
    "Sliding Window",
    "Recursion",
    "Backtracking",
    "Linked List",
    "Tree",
    "Tries",
    "Maths",
    "Simulation",
  ];

  const arrangeCode = (code: string): string[] => {
    code += " ";
    const list = [];
    let st = "";
    for (let i = 0; i < code.length; i++) {
      if (code.charAt(i) == "\n") {
        list.push(st);
        st = "";
      } else {
        st += code.charAt(i);
      }
    }
    // console.log(list);
    return list;
  };
  const setCode = (code : string[]) => {
    // console.log(code);
    let s = "";
    for(let i = 0 ; i < code.length ; i ++)
    {
      s += code[i] + "\n";
    }
    return s;
  }

  useEffect(() => {
    if (_id) {
      const problem = getProblem(_id);
      if (_id && problem) {
        // console.log(problem);
        setValue("number", problem.number);
        setValue("title", problem.title);
        setValue("difficulty", problem.difficulty);
        setValue("description", problem.description);
        setValue("code", setCode(problem.code));
        setValue("notes", problem.notes);
        setValue("tag1", problem.tags.length > 0 ? problem.tags[0] : "");
        setValue("tag2", problem.tags.length > 1 ? problem.tags[1] : "");
        setValue("tag3", problem.tags.length > 2 ? problem.tags[2] : "");
      }
    }
  }, [_id]);
  const onSubmit: SubmitHandler<ProblemDetails> = async (data: any) => {
    // console.log(data);
    const problem = {
      number: +data.number,
      title: data.title,
      difficulty: data.difficulty,
      description: data.description,
      code: arrangeCode(data.code),
      notes: data.notes,
      tags: [data.tag1, data.tag2, data.tag3],
    };
    // console.log(problem);
    try {
      if (_id) {
        const response = await Axios.post("/problem/edit", { _id, ...problem });
        if (response.data) {
          editProblem(_id, { ...problem, _id });
          toast.info("Changes saved");
        } else {
          console.log("Error");
          toast.warning(response.data.message || "Error in Editing Problem");
        }
      } else {
        const response = await Axios.post("/problem/add", problem);
        if (response.data && response.data.problem) {
          addProblem(response.data.problem);
          toast.success("problem added");
        } else {
          console.log("Error");
          toast.success(response.data.message || "Error in Adding Problem");
        }
      }

      navigate("/display");
      reset();
    } catch (error: any) {
      toast.success(error.response.data.message || "Something went Wrong !");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen md:p-3 w-full flex-col items-center justify-center ">
      <div>
        <img
          onClick={() => navigate(-1)}
          className="hover:scale-110 cursor-pointer sm:m-4 m-2 h-6 w-6"
          src={back}
          alt=""
        />
      </div>
      <div className="">
        <h1 className="m-3 text-4xl text-center">Add Problem</h1>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={`w-full md:m-2 space-y-7 border-2 lg:p-10 md:p-3 p-1 rounded-xl flex flex-wrap border-slate-400`}
        >
          <div className="lg:flex gap-4 items-center justify-around">
            <div className="w-[50%]">
              <label className="text-3xl" htmlFor="number">
                Number{" "}
              </label>
              <input
                {...register("number")}
                type="number"
                className={`rounded-2xl w-full py-2 px-3 text-lg border border-slate-400 bg-transparent outline-none ${
                  theme === "light" ? "text-slate-700 " : "text-slate-300"
                }`}
                placeholder="Question Number"
              />
            </div>

            <div className="w-full">
              <label className="text-3xl" htmlFor="title">
                Title{" "}
              </label>
              <input
                {...register("title")}
                type="text"
                className={`rounded-2xl w-full py-2 px-3 text-lg border border-slate-400 bg-transparent outline-none ${
                  theme === "light" ? "text-slate-700 " : "text-slate-300"
                }`}
                placeholder="Title"
              />
            </div>
            <div className="w-[40%] flex gap-4 items-center justify-between">
              <label
                {...register("difficulty")}
                className="text-3xl flex justify-center gap-3 items-center"
                htmlFor="title"
              >
                easy <input type="radio" value="easy" name="difficulty" />
              </label>
              <label
                {...register("difficulty")}
                className="text-3xl flex justify-center gap-3 items-center"
                htmlFor="title"
              >
                medium <input type="radio" value="medium" name="difficulty" />
              </label>
              <label
                {...register("difficulty")}
                className="text-3xl flex justify-center gap-3 items-center"
                htmlFor="title"
              >
                hard <input type="radio" value="hard" name="difficulty" />
              </label>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <div className="space-y-2">
              <label className="text-3xl" htmlFor="title">
                Tag1{" "}
              </label>
              <select
                {...register("tag1")}
                className={`rounded-2xl w-full py-2 px-3 text-lg border border-slate-400 bg-transparent outline-none ${
                  theme === "light" ? "text-slate-700 " : "text-slate-300"
                }`}
                name="tag1"
              >
                {tagsArray.map((tag) => (
                  <option key={tag} className="text-black" value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-3xl" htmlFor="title">
                Tag2{" "}
              </label>
              <select
                {...register("tag2")}
                className={`rounded-2xl w-full py-2 px-3 text-lg border border-slate-400 bg-transparent outline-none ${
                  theme === "light" ? "text-slate-700 " : "text-slate-300"
                }`}
                name="tag2"
              >
                {tagsArray.map((tag) => (
                  <option key={tag} className="text-black" value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-3xl" htmlFor="title">
                Tag3{" "}
              </label>
              <select
                {...register("tag3")}
                className={`rounded-2xl w-full py-2 px-3 text-lg border border-slate-400 bg-transparent outline-none ${
                  theme === "light" ? "text-slate-700 " : "text-slate-300"
                }`}
                name="tag3"
              >
                {tagsArray.map((tag) => (
                  <option key={tag} className="text-black" value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:flex w-full gap-4 items-center justify-center">
            <label className="text-3xl inline-flex" htmlFor="description">
              Description{" "}
            </label>
            <textarea
              {...register("description")}
              className={`rounded-2xl w-full py-2 px-3 text-lg border border-slate-400 bg-transparent outline-none ${
                theme === "light" ? "text-slate-700 " : "text-slate-300"
              }`}
              placeholder="Description"
            />
          </div>
          <div className="lg:flex w-full gap-4 items-center justify-center">
            <label className="text-3xl" htmlFor="code">
              Code{" "}
            </label>
            <textarea
              {...register("code")}
              className={`rounded-2xl py-2 px-3 w-full text-lg border border-slate-400 bg-transparent outline-none ${
                theme === "light" ? "text-slate-700 " : "text-slate-300"
              }`}
              placeholder="code"
            />
          </div>
          <div className="lg:flex w-full gap-4 items-center justify-center">
            <label className="text-3xl" htmlFor="notes">
              Notes{" "}
            </label>
            <textarea
              {...register("notes")}
              className={`rounded-2xl py-2 px-3 text-lg w-full border border-slate-400 bg-transparent outline-none ${
                theme === "light" ? "text-slate-700 " : "text-slate-300"
              }`}
              placeholder="Notes"
            />
          </div>

          <button className="w-full bg-blue-400 text-white hover:bg-blue-500 rounded-2xl py-1 text-xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
