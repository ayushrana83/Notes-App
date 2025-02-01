import { useState } from "react";
import { useTheme } from "../Context/Theme";
import { useProblems } from "../Context/ProblemsContext";
import { useNavigate, useParams } from "react-router-dom";
import upArrow from "../assets/Pictures/Svg/UpArrow.svg";
import downArrow from "../assets/Pictures/Svg/downArrow.svg";
import back from "../assets/Pictures/Svg/Back.svg";

function Details() {
  const { theme } = useTheme();
  const { getProblem } = useProblems();
  const params = useParams();
  const _id = params.id!;
  const navigate = useNavigate();
  const [showCode, setShowCode] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  // const problem: question = {
  //   number: 1,
  //   title: "two sum",
  //   description:
  //     "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //   code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //   notes:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  // };
  const problem = getProblem(_id);
  return (
    problem && (
      <div className="max-w-screen-2xl min-h-screen space-y-5 flex-col items-center justify-center p-4">
        <img
          onClick={() => navigate(-1)}
          className="hover:scale-110 cursor-pointer h-6 w-6"
          src={back}
          alt=""
        />
        <div className="text-3xl font-bold">
          {problem.number}. {problem.title}
        </div>
        <div
          className={`text-xl w-full  ${
            theme === "light" ? "text-slate-600 " : "text-slate-300"
          }`}
        >
          {" "}
          <span className="text-2xl font-bold"> Problem Statement :</span>{" "}
          {problem.description}
        </div>
        <div
          className={`flex flex-wrap items-end gap-2 text-sm ${
            theme === "light" ? "text-slate-600 " : "text-slate-400"
          }`}
        >
          <h3 className="font-semibold text-lg">Tags - </h3>
          {problem.tags &&
            problem.tags.map((tag) => (
              <span key={tag} className="border rounded-xl p-1 hover:scale-105 hover:bg-blue-300">
                {tag}{" "}
              </span>
            ))}
        </div>
        <div
          className={`text-xl min-h-fit w-full  border border-slate-400 p-3 ${
            theme === "light" ? "text-slate-600 " : "text-slate-300"
          }`}
        >
          <div
            className="flex items-center justify-between"
            onClick={() => setShowCode(!showCode)}
          >
            <h2 className="text-2xl font-bold">Code </h2>
            <img
              className="w-7 h-7 "
              src={showCode ? upArrow : downArrow}
              alt=""
            />
          </div>
          <div className={`${showCode ? `` : "hidden"} p-3`}>
            {problem.code.map((line, index) => (
              <div key={index} className="text-gray-500">
                {" "}
                <span className="font-semibold">{index + 1} </span>. {line}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`text-xl border border-slate-400 p-3 ${
            theme === "light" ? "text-slate-600 " : "text-slate-300"
          }`}
        >
          <div
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center justify-between"
          >
            <h2 className="text-2xl font-bold">Notes </h2>
            <img
              className="w-7 h-7 "
              src={showNotes ? upArrow : downArrow}
              alt=""
            />
          </div>
          <p className={`${showNotes ? `` : "hidden"} p-3 text-gray-500`}>
            {problem.notes}
          </p>
        </div>
      </div>
    )
  );
}

export default Details;
