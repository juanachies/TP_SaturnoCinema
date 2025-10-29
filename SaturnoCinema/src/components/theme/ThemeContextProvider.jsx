import { ThemeContext } from "./theme.context";
import { useEffect, useState } from "react";
import { LIGHT_THEME, DARK_THEME } from "./const";

const themeValue = localStorage.getItem("theme") || DARK_THEME;

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeValue);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
     const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
