
import Logo from "../logo/Logo";
import Menu from "../menu/Menu";

const Header = () => {

    return (
        <>
            <div style={ {display: "flex", justifyContent:"space-between"} }>
                <Logo />
                <Menu />
                {/* <Menu /> */}
            </div>
        </>
    )
}

export default Header;