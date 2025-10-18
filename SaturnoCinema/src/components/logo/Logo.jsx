import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "./logo.css"

function Logo() {
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

export default Logo