import { useEffect, useState } from "react";
import { useProblems } from "../Context/ProblemsContext";
import { useTheme } from "../Context/Theme";
import { Link } from "react-router-dom";
import Hambuger from "../assets/Pictures/Svg/Hambuger.svg";
import { Axios } from "../axios";
import { toast } from "react-toastify";

interface Problem {
  _id: string;
  number: number;
  title: string;
  difficulty: string;
  description: string;
  code: string[];
  notes: string;
  tags: string[];
}

function Display() {
  const { theme } = useTheme();
  // const questions = [
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  //   {
  //     number: "1",
  //     title: "two sum",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
  //     code: "class Solution {public int[] twoSum(int[] nums, int target)int n = nums.length;HashMap<Integer , Integer> map = new HashMap<>();for(int i = 0 ; i < n ; i ++){if(map.containsKey(target - nums[i])){return new int[]{map.get(target - nums[i]) , i};}map.put(nums[i] , i);}return new int[]{};}}",
  //     notes:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta eos harum eaque a, sequi doloribus deserunt sit odio officia enim aut provident cum. Laudantium inventore iusto harum minima mollitia.",
  //   },
  // ];
  const { problems, deleteProblem,getProblemByTag , getProblemsBySearch, getProblemsBySort } =
    useProblems();
  // const questions /= problems;
  const [questions, setQuestions] = useState<Problem[] | undefined>(problems);
  const [search, setSearch] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const tagsArray: string[] = [
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

  const handleSearch = () => {
    // console.log(search);
    toast.info("Searching Problem");
    setQuestions(getProblemsBySearch(search));
    setSearch("");
  };
  const handleSort = () => {
    if(sort === "default")
      return;
    // console.log(sort);
    toast.info("Problem Sorted");
    setQuestions(getProblemsBySort(sort));
    setSort("default");
    // e.target.value = "-- sort --"
  };

  const handleTag = () => {
    // console.log(sort);
    if(tag === "default")
      return;
    toast.info("Problem Sorted");
    setQuestions(getProblemByTag(tag));
    setTag("default");
    // e.target.value = "-- sort --"
  };

  const deleteHandler = async (_id: string) => {
    try {
      const response = await Axios.delete("/problem/delete/" + _id);
      // console.log("/delete/"+_id);
      if (response.data) {
        toast.success("Problem deleted");
        deleteProblem(_id);
      } else {
        toast.warning(response.data.message || "Error in Deleting Problem");
        // console.log("Erorr in deleting problem");
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Error in Deleting Problem");
      // console.log("error in deleting problem");
    }
  };

  const difficultyColor: (difficulty: string) => string = (difficulty) => {
    if (difficulty === "easy") return "text-green-400";
    else if (difficulty === "medium") return "text-orange-400";
    else if (difficulty === "hard") return "text-red-400";
    else return "";
  };

  useEffect(() => {
    // console.log(questions);
    // console.log(problems);
    setQuestions(problems);
  }, [problems]);
  return (
    <div className="w-full md:flex justify-center gap-5 ">
      <div
        className={`md:w-[25%] space-y-4 m-3 p-2 md:block  ${
          showMenu
            ? `block z-10 absolute rounded-2xl   px-4 py-8 ${
                theme === "light" ? "bg-slate-200" : "bg-gray-600"
              }`
            : "hidden"
        }`}
      >
        <div className="w-full">
          <div className="text-end text-xl font-bold">
            {" "}
            {showMenu && (
              <span
                onClick={() => setShowMenu(false)}
                className={`rounded-full px-2 py-1 ${
                  theme === "light" ? "bg-gray-300" : "bg-gray-400"
                }`}
              >
                {" "}
                X{" "}
              </span>
            )}
          </div>
          <h3 className="text-xl ">Search</h3>
          <div className="flex justify-between">
            <input
              placeholder="@search"
              onChange={(e) => setSearch(e.target.value)}
              className="border w-[75%]  outline-none px-3 py-1 text-base bg-transparent rounded-xl border-slate-500 "
            />
            <button
              onClick={() => handleSearch()}
              className="text-base px-2 py-1 bg-blue-400 text-white rounded-xl hover:scale-105 hover:bg-blue-500"
            >
              Search
            </button>
          </div>
        </div>
        <div className="">
          <h3 className="text-xl ">Sort</h3>
          <div className="flex justify-between">
            <select
              onChange={(e) => setSort(e.target.value)}
              name="sort"
              className={`bg-transparent w-[70%] border outline-none px-3 py-1 text-base border-slate-500 rounded-xl ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              <option value="default">-- sort --</option>
              <option value={"difficulty"} className="text-black">
                Difficulty
              </option>
              <option value={"number"} className="text-black">
                Number
              </option>
            </select>
            <button
              onClick={() => handleSort()}
              className="hover:scale-105 hover:bg-blue-500 px-4 py-1 bg-blue-400 text-white rounded-xl"
            >
              Sort
            </button>
          </div>
        </div>
        <div className="">
          <h3 className="text-xl">Tags</h3>
          <div className="flex justify-between">
            <select
              onChange={(e) => setTag(e.target.value)}
              name="tag1"
              className={`bg-transparent w-[70%]  border outline-none px-3 py-1 text-base border-slate-500 rounded-xl ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              <option value="default">-- tag --</option>
              {tagsArray.map((tag) => (
                <option key={tag} className="text-black" value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleTag()}
              className="hover:scale-105 hover:bg-blue-500 px-3 py-1 bg-blue-400 text-white rounded-xl"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 md:m-3">
        <div className="">
          <img
            onClick={() => setShowMenu(true)}
            className="w-10 h-10 m-3 bg-white md:hidden block"
            src={Hambuger}
            alt=""
          />
          <Link
            to="/addForm"
            className="bg-blue-400 hover:scale-105 hover:bg-blue-500 text-xl px-4 py-2 text-center rounded-2xl text-white"
          >
            Add <span className="font-bold text-2xl"> + </span>
          </Link>
        </div>
        {questions && questions.length > 0 ? (
          questions?.map((question, index) => (
            <div key={index} className="border-2 w-full rounded-xl p-3 ">
              <div className="text-2xl font-bold w-full lg:w-[80%] flex justify-between">
                <div className="flex gap-2">
                  {question.number}. <p className=""> {question.title}</p>
                </div>
                <div className={`${difficultyColor(question.difficulty)}`}>
                  {question?.difficulty}
                </div>
              </div>
              <div
                className={`flex flex-wrap items-end gap-2 text-sm ${
                  theme === "light" ? "text-slate-600 " : "text-slate-400"
                }`}
              >
                <h3 className="font-semibold text-lg">Tags - </h3>
                {question.tags &&
                  question.tags.map((tag) => (
                    <span key={tag} className="border rounded-xl p-1 hover:scale-105 hover:bg-blue-300">
                      {tag}{" "}
                    </span>
                  ))}
              </div>
              <p
                className={`text-sm ${
                  theme === "light" ? "text-slate-600 " : "text-slate-400"
                }`}
              >
                <span className="font-semibold text-lg">Description :</span>{" "}
                {question.description.substring(0, 150)}...
              </p>
              <div className="flex justify-between">
                <div>
                  <Link
                    to={"/addForm/" + question._id}
                    className="bg-blue-400 hover:scale-105 hover:bg-blue-500 text-xl px-4 py-2 rounded-2xl m-2 text-white"
                  >
                    edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(question._id)}
                    className="bg-blue-400 hover:scale-105 hover:bg-blue-500 text-xl px-4 py-2 rounded-2xl m-2 text-white"
                  >
                    delete
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    to={`/details/${question._id}`}
                    className="bg-blue-400 hover:scale-105 hover:bg-blue-500 text-xl px-4 py-2 rounded-2xl m-2 text-white"
                  >
                    view
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-3xl ">no problems saved</div>
        )}
      </div>
    </div>
  );
}

export default Display;
