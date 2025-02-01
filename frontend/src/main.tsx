import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme.tsx";
import { ProblemProvider } from "./Context/ProblemsContext.tsx";
import { UserProvider } from "./Context/User.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <ProblemProvider>
            <App />
          </ProblemProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
