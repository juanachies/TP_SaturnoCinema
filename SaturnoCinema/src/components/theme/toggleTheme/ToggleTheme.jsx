import { useContext } from "react";
import { ThemeContext } from "../theme.context";
import { LIGHT_THEME } from "../const.js";
import "./ToggleTheme.css";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme !== LIGHT_THEME}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleTheme;
