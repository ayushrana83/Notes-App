import { createContext, ReactNode, useContext, useState } from "react";

type User = {
    email : string ;
    password : string ;
}

interface UserContextType {
    user : User | undefined;
    loginUser : (email : string , password : string) => void;
    signUpUser : (email : string , password : string , confirmPassword : string) => void;
    logoutUser : () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children : ReactNode;
}

export const UserProvider : React.FC<UserProviderProps> = ({children}) => {
    const [user , setUser] = useState<User | undefined>(undefined);

    const loginUser = (email : string , password : string) => {
        const user = {email , password};
        setUser(user);
    }
    const signUpUser = (email : string , password : string) => {
        const user = {email , password};
        setUser(user);
    }
    const logoutUser = () => {
        setUser(undefined);
    }
    return (
        <UserContext.Provider value={{user , loginUser , signUpUser , logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser  = () : UserContextType => {
    const context = useContext(UserContext);
    if(!context)
    {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
}