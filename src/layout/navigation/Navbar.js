import Menu from './Menu';
import NavIcons from './NavIcons';

function Navbar() {

    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" className="mobile-nav" />
            <NavIcons />
            <Menu />
        </div>
    )
}

export default Navbar;