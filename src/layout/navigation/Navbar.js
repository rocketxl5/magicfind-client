import Menu from './Menu';
import Buttons from './Buttons';

function Navbar() {

    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" className="mobile-nav" />
            <Buttons />
            <Menu />
        </div>
    )
}

export default Navbar;