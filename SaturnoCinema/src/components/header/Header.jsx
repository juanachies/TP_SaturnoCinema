
import Logo from "../logo/Logo";
import Menu from "../menu/Menu";
import "./header.css";

const Header = () => {

    return (
        <>
            <div className="header-style">
                <Logo />
                <Menu />
            </div>
        </>
    )
}

export default Header;