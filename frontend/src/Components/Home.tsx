import lightLeetcode from "../assets/Pictures/lightLeetcode.png";
import darkLeetcode from "../assets/Pictures/darkLeetcode.jpg";
import LeetCodeSvg from "../assets/Pictures/Svg/leetcode.svg";
import CodeForcesSvg from "../assets/Pictures/Svg/Codeforces.svg";
import CodeChefSvg from "../assets/Pictures/Svg/Codechef.svg";
import GfgSvg from "../assets/Pictures/Svg/Gfg.svg";
import { Link } from "react-router-dom";
import { useTheme } from "../Context/Theme";
import { useUser } from "../Context/User";

function Home() {
  const svgArray = [
    { name: "Leetcode", logo: LeetCodeSvg },
    { name: "Codeforces", logo: CodeForcesSvg },
    { name: "Codechef", logo: CodeChefSvg },
    { name: "GeekForGeeks", logo: GfgSvg },
  ];
  const { theme } = useTheme();
  const {user} = useUser();

  return (
    <div className="flex flex-col lg:flex-row max-w-screen-2xl items-center
    justify-center px-4 py-8">
      {/* Left side */}
      <div className="flex flex-col items-center md:items-baseline justify-center space-y-4 w-full lg:w-[35%]">
        <h1 className="text-6xl lg:text-7xl mx-auto tracking-tighter ">
          Keep Track of Problems You Solved
        </h1>
        <ul className={`list-disc mx-auto  text-base ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
          <li>Easy Access</li>
          <li>Quick Revision</li>
          <li>Track Progress</li>
        </ul>
        <div className="mx-auto">
          <Link
            to={user ? "/display" : "/login"}
            className="bg-blue-400  text-white cursor-pointer rounded-2xl py-2 px-7 text-lg lg:text-xl"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Right side */}
      <div className="lg:w-[40%] relative text-white flex items-center justify-center mt-8 lg:mt-0">
        <img
          className="object-cover w-full h-auto lg:w-full lg:h-auto"
          src={theme === 'light' ? lightLeetcode : darkLeetcode}
          alt="Leetcode Banner"
        />
        <div className="absolute flex items-center space-x-3 justify-center flex-wrap gap-5">
          {svgArray.map((svg, index) => (
            <div key={index} className="flex bg-slate-600 px-3 py-1 rounded-xl">
              <img className="w-4 h-4 md:w-8 md:h-8 mr-2" src={svg.logo} alt={svg.name} />
              <div className="text-base lg:text-lg">{svg.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
