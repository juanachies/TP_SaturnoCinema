
import Logo from "../logo/Logo";

const Header = () => {

    return (
        <>
            <div style={ {display: "flex", justifyContent:"space-between"} }>
                <Logo />
                <h2>menu</h2>
                {/* <Menu /> */}
            </div>
        </>
    )
}

export default Header;