import { Link } from "react-router-dom";
import logoLight from "../../img/logoLight.png";
import { useContext } from "react";
import { ThemeContext } from "../theme/theme.context.jsx";
import { LIGHT_THEME } from "../theme/const.js";
import logoDark from "../../img/logoDark.png";
import "./logo.css";

function Logo() {

    const { theme } = useContext(ThemeContext);
        
        const logo= theme === LIGHT_THEME ? logoDark  : logoLight;

    return (
        <div className="logo-style">
            <Link to="/">
                <img src={logo} alt="Logo Saturno" />
            </Link>
            <div>
                <h3 className="titulo-logo">SATURNO</h3>
                <h6 className="subtitulo-logo">CINEMA</h6>
            </div>

        </div>
    )
}

export default Logo;