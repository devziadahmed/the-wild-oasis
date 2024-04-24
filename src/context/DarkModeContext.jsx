import { createContext, useContext, useEffect } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const contextValue = useContext(DarkModeContext);

  if (contextValue === "undefined")
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return contextValue;
}

export { DarkModeProvider, useDarkMode };
