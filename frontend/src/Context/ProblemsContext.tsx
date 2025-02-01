import { createContext, ReactNode, useContext, useState } from "react";

interface Problem {
    _id : string,
    number: number;
    title: string;
    difficulty : string ;
    description: string;
    code: string[];
    notes: string;
    tags : string[];
  }

interface ProblemContextType {
    problems : Problem[],
    setProblems : (problems : Problem[]) => void,
    addProblem : (problem : Problem) => void,
    getProblem : (_id : string) => Problem | undefined,
    getProblemsBySort : (s : string) => Problem[] | undefined,
    getProblemsBySearch : (s : string) => Problem[] | undefined,
    editProblem : (_id : string , problem : Problem) => void,
    getProblemByTag : (tag : string) => Problem[] | undefined,
    deleteProblem : (_id : string) => void,
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

interface ProblemProviderProps{
    children : ReactNode;
}

export const ProblemProvider : React.FC<ProblemProviderProps> = ({children}) => {
    const [problems , setProblems] = useState<Problem[]>([]);
    const addProblem = (problem : Problem) => {
        setProblems((prevProblems) => [...prevProblems , problem]);
    }
    const getProblem = (_id : string) => {
        const problem = problems.find((pro) => pro._id === _id);
        return problem;
    }
    const getProblemsBySearch = (s : string) => {
        return  problems.filter((pro) => pro.title.toLowerCase().startsWith(s.toLowerCase()));
    }
    const getProblemByTag = (tag : string) => {
        // console.log("Taggs");
        return  problems.filter((pro) => pro.tags.includes(tag));
    }

    const getProblemsBySort = (s : string) => {
        const newProblems = [...problems];
        // console.log("sortnumber");
        if(s === "number")
        {
            newProblems.sort((a ,b) => a.number - b.number);
            return newProblems;
        }
        else if(s === "difficulty")
        {
            const easy = newProblems.filter((pro) => pro.difficulty === 'easy');
            const medium = newProblems.filter((pro) => pro.difficulty === 'medium');
            const hard = newProblems.filter((pro) => pro.difficulty === 'hard');
            return [...easy , ...medium , ...hard];
        }
    }

    const deleteProblem = (_id : string) => {
        setProblems((prevProblems) => prevProblems.filter((pro) => pro._id !== _id));
    }

    const editProblem = (_id : string , problem : Problem) => {
        setProblems((prevProblems) => (
            prevProblems.map((p) => p._id === _id ? problem : p)
        ))
    };

    return (
        <ProblemContext.Provider value={{problems , getProblemByTag , addProblem , setProblems , getProblem, getProblemsBySearch , getProblemsBySort , editProblem , deleteProblem}}>
            {children}
        </ProblemContext.Provider>
    );
};

export const useProblems = () : ProblemContextType => {
    const context = useContext(ProblemContext);
    if(!context)
    {
        throw new Error("useProblem must be used within contextProvider");
    }
    return context;
}