import React, { createContext, ReactNode, useContext, useState } from "react"

type Theme =  "dark"  | "light";

interface ThemeContextType {
    theme : Theme;
    toggleTheme : () => void;
}
 
const initialTheme = () : Theme => {
    const systemTheme = window.matchMedia("(prefers-color-scheme : dark)").matches ? "dark" : "light";
    return systemTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children : ReactNode;
}

export const ThemeProvider : React.FC<ThemeProviderProps> = ({children}) => {
    const [theme , setTheme] = useState<Theme>(initialTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'light' ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{theme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () : ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context)
    {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}