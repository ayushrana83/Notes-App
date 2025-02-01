import { Request, Response } from "express";
import { Problem } from "../Models/Problem";

export const getAllProblemController = async (req: Request, res: Response) => {
  try {
    const user = req.userId;
    // console.log("user = " , user);
    const problems = await Problem.find({ user });
    // console.log(problems);
    res.status(200).json({ problems });
  } catch (error) {
    res.status(500).json({ message: "Error in getAllProblem", error });
  }
};

export const getProblemByIdController = async (req: Request, res: Response) => {
  try {
    const user = req.userId;
    const { id } = req.params;
    const problem = await Problem.find({ _id: id, user });
    res.status(200).json({ problem });
  } catch (error) {
    res.status(500).json({ message: "Error in getByIDProblem", error });
  }
};

export const deleteProblemController = async (req: Request, res: Response) => {
  try {
    const user = req.userId;
    const { id } = req.params;
    // console.log(id);
    const problem = await Problem.deleteOne({ _id: id, user });
    res.status(200).json({ message: "message problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleteProblem", error });
  }
};

export const addProblemController = async (req: Request, res: Response) => {
  try {
    const user = req.userId;
    const { number, title, difficulty, description, code, notes , tags } = req.body;
    // console.log(user);
    // console.log(req.body);
    const problem = new Problem({
      number,
      title,
      difficulty,
      description,
      code,
      notes,
      user,
      tags
    });
    await problem.save();
    // console.log("problem svaed = " ,problem);
    res.status(200).json({ problem });
  } catch (error) {
    res.status(500).json({ message: "Error in addProblem", error });
  }
};

export const editProblemController = async (req: Request, res: Response) => {
  try {
    const user = req.userId;
    const { _id, number, title, difficulty, description, code, notes , tags } =
      req.body;
    // console.log(user); 
    // console.log(req.body);
    const problem = await Problem.findByIdAndUpdate(
      _id,
      { number, title, difficulty, description, code, notes  , user , tags},
      { new: true }
    );
    // console.log("problem svaed = " ,problem);
    res.status(200).json({ problem });
  } catch (error) {
    res.status(500).json({ message: "Error in editProblem", error });
  }
};

export const searchProblemController = async (req: Request, res: Response) => {
  try {
    const user = req.userId;
    const { prefix } = req.params;
    const problems = await Problem.find({
      title: { $regex: `^${prefix}`, $options: "i" },
      user,
    });
    res.status(200).json({ problems });
  } catch (error) {
    res.status(500).json({ message: "Error in searchProblem", error });
  }
};

export const sortProblemController = async (req: Request, res: Response) => {
  try {
    const user = req.userId;
    const { field } = req.params;
    // console.log(field);
    let problems = await Problem.find({ user });
    if (field === "number") {
      problems.sort((a, b) => a.number - b.number);
    } else if (field === "difficulty") {
      const easy = problems.filter((pro) => pro.difficulty === "easy");
      const medium = problems.filter((pro) => pro.difficulty === "medium");
      const hard = problems.filter((pro) => pro.difficulty === "hard");
      problems = [...easy, ...medium, ...hard];
    }
    res.status(200).json({ problems });
  } catch (error) {
    res.status(500).json({ message: "error in sortProblemController", error });
  }
};


// export const updateProblem = async(req : Request , res : Response) => {
//   try {
//     const user = req.userId;
//     const problem = await Problem.find({user});
//     console.log(problem);
//     for(let i = 0 ; i < problem.length ; i ++)
//     {
//       if(problem[i].tags.length === 0)
//       {
//         if(i % 2 == 0)
//         {
//           problem[i].tags = ["String" , "Searching" , "Sorting"];
//         }
//         else
//         {
//           problem[i].tags = ["Graph" , "Trie" , "Hash Table"];
//         }
//       }
//       console.log(i + " \n");
//       await problem[i].save();
//     }
//   } catch (error) {
//     console.log("error");
//   }
// }