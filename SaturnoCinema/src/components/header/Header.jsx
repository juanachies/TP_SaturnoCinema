import Logo from "../logo/Logo";
import Menu from "../menu/Menu";
import ToggleTheme from "../theme/toggleTheme/ToggleTheme";
import "./header.css";

const Header = () => {

    return (
        <>
            <div className="header-style">
                <Logo />
                <Menu />
                <ToggleTheme />
            </div>
        </>
    )
}

export default Header;